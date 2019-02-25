suite('slider value getting/setting', function() {
    const sliderWidth = 500;
    const thumbCenterOffset = 5/2 + 3; // width/2 + left border
    const container = document.createElement('div');
    container.innerHTML = `<script type="module" src="../src/slider.js"></script>
                           <wcia-slider style="width: ${sliderWidth}px" value="50"></wcia-slider>`;
    document.body.appendChild(container);
    const slider = container.querySelector('wcia-slider');

    test('slider get initial value', function () {
        assert.equal(slider.value, 50);
        assert.equal(slider.getAttribute('value'), 50);
        assert.equal(slider.root.querySelector('.thumb').style.left, sliderWidth * 50/100 - thumbCenterOffset + 'px');
    });

    test('set slider value with JS', function () {
        slider.value = 20;
        assert.equal(slider.value, 20);
        assert.equal(slider.getAttribute('value'), 20);
        assert.equal(slider.root.querySelector('.thumb').style.left, sliderWidth * 20/100 - thumbCenterOffset + 'px');
    });

    test('set slider value with attributes', function () {
        slider.setAttribute('value', 30);
        assert.equal(slider.value, 30);
        assert.equal(slider.getAttribute('value'), 30);
        assert.equal(slider.root.querySelector('.thumb').style.left, sliderWidth * 30/100 - thumbCenterOffset + 'px');
    });

    /*test('set slider value too big', function () {
        slider.setAttribute('value', 110);
        assert.equal(slider.value, 100);
        assert.equal(slider.getAttribute('value'), 100);
        assert.equal(slider.root.querySelector('.thumb').style.left, sliderWidth * 100/100 - thumbCenterOffset + 'px');
    });

    test('set slider value too small', function () {
        slider.setAttribute('value', -10);
        assert.equal(slider.value, 0);
        assert.equal(slider.getAttribute('value'), 0);
        assert.equal(slider.root.querySelector('.thumb').style.left, sliderWidth * 0/100 - thumbCenterOffset + 'px');
    });*/
});
