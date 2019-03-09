export default {
    /**
     * convert image to grayscale
     * @param {ImageData} pxs
     * @returns {*}
     */
    toGrayscale(pxs) {
        for (var c = 0; c < pxs.data.length; c+=4) {
            var gray = (pxs.data[c] + pxs.data[c+1] + pxs.data[c+2])/3;
            pxs.data[c] = pxs.data[c+1] = pxs.data[c+2] = gray;
        }
        return pxs;
    },

    /**
     * saturate image
     * @param {ImageData} pxs
     * @param {Number} percentamount percentage saturation
     * @returns {*}
     */
    saturate(pxs, percentamount) {
        if (!percentamount) { percentamount = 50; }
        var amt = percentamount/100 * 255;
        for (var c = 0; c < pxs.data.length; c+=4) {
            pxs.data[c] = pxs.data[c] + amt;
            pxs.data[c+1] = pxs.data[c+1] + amt;
            pxs.data[c+2] = pxs.data[c+2] + amt;
        }
        return pxs;
    },

    /**
     * convert 2 images to an image highlighting differences
     * @param pxs1
     * @param pxs2
     * @param tolerance
     * @returns {*}
     */
    toDiff(pxs1, pxs2, tolerance) {
        if (pxs1.data.length !== pxs2.data.length) { throw new Error('images not the same size'); }
        var diff = new ImageData(pxs1.width, pxs1.height);
        for (var c = 0; c < pxs1.data.length; c+=4) {
            var draw = 255;
            for (var d = 0; d < 4; d++) {
                if (pxs1.data[c+d] - pxs2.data[c+d] > tolerance) {
                    draw = 0;
                    continue;
                }
            }

            diff.data[c] = draw;
            diff.data[c+1] = draw;
            diff.data[c+2] = draw;
            diff.data[c+3]= 255;
        }
        return diff;
    },

    /**
     * convert to pure black or pure white
     * @param pxs
     * @param pxs
     * @returns {*}
     */
    toBlackAndWhite(pxs, thresholdtoblackpercent) {
        if (!thresholdtoblackpercent) { thresholdtoblackpercent = 50; }
        var threshold = thresholdtoblackpercent/100 * (255 + 255 + 255);
        for (var c = 0; c < pxs.data.length; c+=4) {
            if (pxs.data[c] + pxs.data[c+1] + pxs.data[c+2] < threshold ) {
                pxs.data[c] = 0;
                pxs.data[c+1] = 0;
                pxs.data[c+2] = 0;
            } else {
                pxs.data[c] = 255;
                pxs.data[c+1] = 255;
                pxs.data[c+2] = 255;
            }
        }

        return pxs;
    }
}