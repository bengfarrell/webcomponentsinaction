import Video from './video.js';

export default class HandTracker extends Video {
    static get HAND_LOCATION() { return 'onHandLocation'; }
    constructor() {
        super();

        const modelParams = {
            flipHorizontal: true,   // flip e.g for video
            maxNumBoxes: 20,        // maximum number of boxes to detect
            iouThreshold: 0.5,      // ioU threshold for non-max suppression
            scoreThreshold: 0.6,    // confidence threshold for predictions.
        };

        // Load the model.
        handTrack.load(modelParams).then(lmodel => {
            this._model = lmodel;
        });

    }


    runDetection() {
        if (!this._model) { return; }
        this._model.detect(this.dom.video).then(predictions => {
            const pts = [];
            for (let c = 0; c < predictions.length; c++) {
                const centerpoint = {};
                centerpoint.x = (predictions[c].bbox[0] + (predictions[c].bbox[2] / 2));
                centerpoint.y = (predictions[c].bbox[1] + (predictions[c].bbox[3] / 2));
                pts.push(centerpoint);
            }
            this._model.renderPredictions(predictions, this.dom.canvas, this.canvasContext, this.dom.video);

            const ce = new CustomEvent( HandTracker.HAND_LOCATION, { detail: { points: pts }, bubbles: true, composed: true });
            this.dispatchEvent(ce);
        });
    }

    init() {
        super.init();
        handTrack.startVideo(this.dom.video).then((status) => {
            this.onResize();
            if (status) {
                this.runDetection();
            }
        });
    }

    getCurrentFrameData(mode, noredraw) {
        this.runDetection();
    }
}

if (!customElements.get('wcia-handtracker')) {
    customElements.define('wcia-handtracker', HandTracker);
}

