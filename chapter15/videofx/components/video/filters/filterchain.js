import JSFeatFilters from './jsfeat/filters.js';
import Filters from './canvas/filters.js';

export default class {
    /**
     * c-tor
     */
    constructor(pxs) {
        this.result = pxs;
    };

    /**
     * convert image to grayscale
     * @param {ImageData} pxs
     * @returns {*}
     */
    toJSFeatGrayscale() {
        this.result = JSFeatFilters.toGrayscale(this.result);
        return this;
    };

    /**
     * to sobel derivative
     * @param {ImageData} pxs
     * @returns {*}
     */
    toSobelDerivative() {
        this.result = JSFeatFilters.toSobelDerivative(this.result);
        return this;
    };

    /**
     * to pyrdown
     * @param pxs
     * @returns {*}
     */
    toPyrdown() {
        this.result = JSFeatFilters.toPyrdown(this.result);
        return this;
    };

    /**
     * to box blur gray
     * @param radius
     * @returns {*}
     */
    toBoxBlurGray(radius) {
        this.result = JSFeatFilters.toBoxBlurGray(this.result, radius);
        return this;
    }

    /**
     * visualize fast corners
     * @param threshold
     * @returns {*}
     */
    features(params) {
        this.result = JSFeatFilters.fastCorners(this.result, params);
        return this;
    }


    /**
     * convert image to grayscale
     * @param {ImageData} pxs
     * @returns {*}
     */
    toGrayscale() {
        this.result = Filters.toGrayscale(this.result);
        return this;
    };

    /**
     * saturate image
     * @param {ImageData} pxs
     * @param {Number} percentamount percentage saturation
     * @returns {*}
     */
    saturate(percentamount) {
        this.result = Filters.saturate(this.result, percentamount);
        return this;
    };

    /**
     * convert to pure black or pure white
     * @param pxs
     * @param pxs
     * @returns {*}
     */
    toBlackAndWhite(thresholdtoblackpercent) {
        this.result = Filters.toBlackAndWhite(this.result, thresholdtoblackpercent);
        return this;
    };

    /**
     * convert 2 images to an image highlighting differences
     * @param pxs1
     * @param pxs2
     * @param tolerance
     * @returns {*}
     */
    toDiff(compare, tolerance) {
        this.result = Filters.toDiff(this.result, compare, tolerance);
        return this;
    }
}