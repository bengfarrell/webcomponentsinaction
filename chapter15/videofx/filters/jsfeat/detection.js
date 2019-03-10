import JSFeat from './jsfeat.wrapper.js';
import Detection from './detection.js';

export default class {
    static get FAST_DETECTOR() { return 'fast'};
    static get YAPE_DETECTOR() { return 'yape'};
    static get YAPE06_DETECTOR() { return 'yape06'};

    static get DEFAULT_FAST_DETECTOR_OPTIONS() {
        return {
            visualize: true,
            maxCorners: 999999,
            threshold: 20,
            border: 5,
            boxBlurRadius: 2,
            detector: 'fast'
        }
    };

    static get DEFAULT_YAPE06_DETECTOR_OPTIONS() {
        return {
            visualize: true,
            maxCorners: 999999,
            threshold: 20,
            border: 5,
            boxBlurRadius: 2,
            detector: 'yape06',
            laplacian_threshold: 20,
            min_eigen_value_threshold: 20
        }
    }

    static get DEFAULT_YAPE_DETECTOR_OPTIONS() {
        return {
            visualize: true,
            maxCorners: 999999,
            threshold: 20,
            border: 4,
            boxBlurRadius: 2,
            detector: 'yape',
            detectorRadius: 5
        }
    }

    static get DEFAULT_OPTICAL_FLOW_OPTIONS() {
        return {
            win_size: 20,
            max_iterations: 30,
            epsilon: 0.01,
            min_eigen: 0.001,
            maxTrackingPoints: 1000,
            visualize: true,
            visualizeColor: 'red'
        };
    }

    static get DEFAULT_MOTION_ESTIMATION_OPTIONS() {
        return {
            active: true,
            autoFlowPoints: false,
            useRansac: true,
            framesPerSession: 500000000, // number of frames captured before resetting optical flow points
            model_size: 4, // minimum points to estimate motion
            thresh: 150, // max error to classify as inlier
            eps: 0.5, // max outliers ratio
            prob: 0.9, // probability of success
            max_iters: 1000,
            visualize: true,
            visualizeColor: 'yellow',
            visualizeLookBack: 10
        }
    }

    static ProcessFeatures(pxs, params) {
        let corners = [];
        let i = pxs.width * pxs.height;
        while (--i >= 0) {
            corners[i] = new JSFeat.keypoint_t(0, 0, 0, 0);
        }

        let img_u8 = new JSFeat.matrix_t(pxs.width, pxs.height, JSFeat.U8_t | JSFeat.C1_t);
        JSFeat.imgproc.grayscale(pxs.data, pxs.width, pxs.height, img_u8);
        JSFeat.imgproc.box_blur_gray(img_u8, img_u8, params.boxBlurRadius, 0);

        let count;
        switch (params.detector) {
            case Detection.FAST_DETECTOR:
                JSFeat.fast_corners.set_threshold(params.threshold);
                count = JSFeat.fast_corners.detect(img_u8, corners, params.border);
                break;

            case Detection.YAPE06_DETECTOR:
                JSFeat.yape06.laplacian_threshold = 20;
                JSFeat.yape06.min_eigen_value_threshold = 20;
                count = JSFeat.yape06.detect(img_u8, corners, params.border);
                break;

            case Detection.YAPE_DETECTOR:
                JSFeat.yape.init(pxs.width, pxs.height, params.detectorRadius, 1);
                count = JSFeat.yape.detect(img_u8, corners, params.border);
                break;
        }

        JSFeat.math.qsort(corners, 0, count-1, function(a,b){return (b.score<a.score);});
        if(count > params.maxCorners) {
            count = params.maxCorners;
        }

        let features = corners.slice(0, params.maxCorners);
        if (params.visualize) {
            let data_u32 = new Uint32Array(pxs.data.buffer);
            Detection._render_corners(corners, count, data_u32, pxs.width);
        }
        return {image: pxs, features: features, numFeatures: count };
    }

    static _render_corners(corners, count, img, step) {
        let pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
        for (let i = 0; i < count; ++i) {
            let x = corners[i].x;
            let y = corners[i].y;
            let off = (x + y * step);
            img[off] = pix;
            img[off - 1] = pix;
            img[off + 1] = pix;
            img[off - step] = pix;
            img[off + step] = pix;
        }
    }

    set opticalFlowOptions(opt) { this._opticalFlowOptions = opt; }
    get opticalFlowOptions() { return this._opticalFlowOptions; }
    set featureDetectOptions(opt) { this._featureDetectOptions = opt; }
    get featureDetectOptions() { return this._featureDetectOptions };
    set motionEstimatorOptions(opt) { this._motionEstimatorOptions = opt; }
    get motionEstimatorOptions() { return this._motionEstimatorOptions };

    constructor(ctx) {
        this.canvasContext = ctx;
        this.opticalFlowOptions = Detection.DEFAULT_OPTICAL_FLOW_OPTIONS;
        this.featureDetectOptions = Detection.DEFAULT_YAPE06_DETECTOR_OPTIONS;
        this.motionEstimatorOptions = Detection.DEFAULT_MOTION_ESTIMATION_OPTIONS;

        this._motionFrames = [];
    }

    set context(ctx) {
        this.canvasContext = ctx;
    }

    get numFlowPoints() {
        return this._pointsCount;
    }

    addFlowPoint(x, y) {
        this._currentPoints[this._pointsCount<<1] = x;
        this._currentPoints[(this._pointsCount<<1)+1] = y;
        this._pointsCount ++;
    }

    autoAddFlowPoints(pxs) {
        let feats = Detection.ProcessFeatures(pxs, this.featureDetectOptions);
        for (let c = 0; c < feats.numFeatures; c++) {
            this.addFlowPoint(feats.features[c].x, feats.features[c].y);
        }
    }

    updateFlow(pxs) {
        if (!this._flowInitialized) {
            this._flowInitialize(pxs);
        }

        // auto generate flow points by feature detection if active or we're starting over because X number of frames were captured
        if (this.motionEstimatorOptions.active && this.motionEstimatorOptions.autoFlowPoints &&
            (this.numFlowPoints === 0 || this._motionFrames.length >= this.motionEstimatorOptions.framesPerSession)) {
            this._motionFrames = [];
            this._pointsCount = 0;
            this.autoAddFlowPoints(pxs);
        }

        // swap flow data
        let _pt_xy = this._previousPoints;
        this._previousPoints = this._currentPoints;
        this._currentPoints = _pt_xy;

        let _pyr = this._previousPyramid;
        this._previousPyramid = this._currentPyramid;
        this._currentPyramid = _pyr;

        JSFeat.imgproc.grayscale(pxs.data, pxs.width, pxs.height, this._currentPyramid.data[0]);
        this._currentPyramid.build(this._currentPyramid.data[0], true);

        JSFeat.optical_flow_lk.track(
            this._previousPyramid,
            this._currentPyramid,
            this._previousPoints,
            this._currentPoints,
            this._pointsCount,
            this.opticalFlowOptions.win_size, this.opticalFlowOptions.max_iterations,
            this._pointstatus, this.opticalFlowOptions.epsilon, this.opticalFlowOptions.min_eigen);

        let curr = this._convertBufferToCoords(this._currentPoints, this._pointsCount, this._pointstatus);

        // run ransac for motion estimation
        if (this.motionEstimatorOptions.active && this.motionEstimatorOptions.useRansac) {
            let prev = this._convertBufferToCoords(this._previousPoints, this._pointsCount);

            let ok = this._ransac(this._ransacParams, this._ransacHomo_kernel, prev, curr, this._pointsCount, this._ransacTransform, this._ransacMask, this.motionEstimatorOptions.max_iters);
            if (ok && curr.length > 15) {
                for (let d = 0; d < curr.length; d++) {
                    curr[d].active = curr[d].active && Boolean(this._ransacMask.data[d]);
                }
            }
        }

        for (let c = 0; c < curr.length; c++) {
            if (this.opticalFlowOptions.visualize) {
                this.canvasContext.fillStyle = this.opticalFlowOptions.visualizeColor;
                this.canvasContext.beginPath();
                this.canvasContext.arc(curr[c].x, curr[c].y, 2, 0, Math.PI*2, true);
                this.canvasContext.closePath();
                this.canvasContext.fill();
            }
        }

        let motionframe = curr.slice();

        // if motion estimation is active, set points equal to previous that traveled too obviously far from previous frame
        if (this.motionEstimatorOptions.active) {
            this._lastMotionFrame = motionframe;
            this._motionFrames.push(motionframe);

            if (this.motionEstimatorOptions.visualize) {
                let start = this._motionFrames.length - this.motionEstimatorOptions.visualizeLookBack;
                if (start < 0) {
                    start = 0;
                }
                for (let d = start; d < this._motionFrames.length; d++) {
                    if (this._motionFrames[d] &&
                        this._motionFrames[d - 1]) {
                        for (let e = 0; e < this._motionFrames[d].length; e++) {
                            if (d > 0) {
                                this.canvasContext.strokeStyle = 'yellow';
                                this.canvasContext.beginPath();

                                if (this._motionFrames[d - 1][e] &&
                                    this._motionFrames[d][e] &&
                                    this._motionFrames[d][e].active &&
                                    this._motionFrames[d - 1][e].active ) {
                                    this.canvasContext.moveTo(this._motionFrames[d - 1][e].x, this._motionFrames[d - 1][e].y);
                                    this.canvasContext.lineTo(this._motionFrames[d][e].x, this._motionFrames[d][e].y);
                                    this.canvasContext.stroke();
                                }
                            }
                        }
                    }
                }
            }
        }
        return motionframe;
    }

    updateFeatures(pxs) {
        return Detection.ProcessFeatures(pxs, this.featureDetectOptions);
    }

    _flowInitialize(pxs) {
        this._currentPyramid = new JSFeat.pyramid_t(3);
        this._currentPyramid.allocate(pxs.width, pxs.height, JSFeat.U8_t | JSFeat.C1_t);
        this._previousPyramid = new JSFeat.pyramid_t(3);
        this._previousPyramid.allocate(pxs.width, pxs.height, JSFeat.U8_t | JSFeat.C1_t);
        this._pointsCount = 0;
        this._previousPoints = new Float32Array(this.opticalFlowOptions.maxTrackingPoints*2);
        this._currentPoints = new Float32Array(this.opticalFlowOptions.maxTrackingPoints*2);
        this._pointstatus = new Uint8Array(this.opticalFlowOptions.maxTrackingPoints);
        this._flowInitialized = true;

        this._ransac = JSFeat.motion_estimator.ransac;
        this._ransacHomo_kernel = new JSFeat.motion_model.homography2d();
        this._ransacTransform = new JSFeat.matrix_t(3, 3, JSFeat.F32_t | JSFeat.C1_t);

        this._ransacMask = new JSFeat.matrix_t(this.opticalFlowOptions.maxTrackingPoints, 1, JSFeat.U8_t | JSFeat.C1_t);
        this._ransacParams = new JSFeat.ransac_params_t(this.motionEstimatorOptions.model_size, this.motionEstimatorOptions.thresh, this.motionEstimatorOptions.eps, this.motionEstimatorOptions.prob);
    }

    _convertBufferToCoords(buffer, count, status) {
        let coords = [];
        for (let c = 0; c < count*2; c+=2) {
            let coord = { x: buffer[c], y: buffer[c+1] };
            if (status && status[c]) {
                coord.active = true;
            } else {
                coord.active = false;
            }
            coords.push(coord);
        }
        return coords;
    }
}
