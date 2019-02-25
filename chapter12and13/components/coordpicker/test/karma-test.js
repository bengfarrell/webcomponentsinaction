suite('coordpicker x,y getting/setting', function() {
    const coordPickerSize = 500;
    const thumbCenterOffset = 5/2 + 3; // width/2 + left border
    const container = document.createElement('div');
    container.innerHTML = `<script type="module" src="../src/coordpicker.js"></script>
                           <wcia-coord-picker style="width: ${coordPickerSize}px; height: ${coordPickerSize}px" x="50" y="50"></wcia-coord-picker>`;

    document.body.appendChild(container);
    const coordpicker = container.querySelector('wcia-coord-picker');

    test('coordpicker get initial x, y', function () {
        assert.equal(coordpicker.x, 50);
        assert.equal(coordpicker.getAttribute('x'), 50);
        assert.equal(coordpicker.y, 50);
        assert.equal(coordpicker.getAttribute('y'), 50);
        assert.equal(coordpicker.root.querySelector('.thumb').style.left, coordPickerSize * 50/100 - thumbCenterOffset + 'px');
        assert.equal(coordpicker.root.querySelector('.thumb').style.top, coordPickerSize * 50/100 - thumbCenterOffset + 'px');
    });

    test('set coordpicker x, y with JS', function () {
       coordpicker.x = 20;
       assert.equal(coordpicker.x, 20);
       assert.equal(coordpicker.getAttribute('x'), 20);
       assert.equal(coordpicker.root.querySelector('.thumb').style.left, coordPickerSize * 20/100 - thumbCenterOffset + 'px');

       coordpicker.y = 60;
       assert.equal(coordpicker.y, 60);
       assert.equal(coordpicker.getAttribute('y'), 60);
       assert.equal(coordpicker.root.querySelector('.thumb').style.top, coordPickerSize * 60/100 - thumbCenterOffset + 'px');
    });

    test('set coordpicker x, y with attributes', function () {
       coordpicker.setAttribute('x', 30);
       assert.equal(coordpicker.x, 30);

       coordpicker.setAttribute('y', 90);
       assert.equal(coordpicker.y, 90);

       assert.equal(coordpicker.getAttribute('x'), 30);
       assert.equal(coordpicker.getAttribute('y'), 90);
       assert.equal(coordpicker.root.querySelector('.thumb').style.left, coordPickerSize * 30/100 - thumbCenterOffset + 'px');
       assert.equal(coordpicker.root.querySelector('.thumb').style.top, coordPickerSize * 90/100 - thumbCenterOffset + 'px');
    });

    /*
    test('set coordpicker x too big', function () {
        coordpicker.setAttribute('x', 110);
        assert.equal(coordpicker.x, 100);
        assert.equal(coordpicker.getAttribute('value'), 100);
        assert.equal(coordpicker.root.querySelector('.thumb').style.left, coordPickerSize * 100/100 - thumbCenterOffset + 'px');
    });

    test('set coordpicker x too small', function () {
        coordpicker.setAttribute('value', -10);
        assert.equal(coordpicker.x, 0);
        assert.equal(coordpicker.getAttribute('x'), 0);
        assert.equal(coordpicker.root.querySelector('.thumb').style.left, coordPickerSize * 0/100 - thumbCenterOffset + 'px');
    });

    test('set coordpicker y too big', function () {
        coordpicker.setAttribute('y', 110);
        assert.equal(coordpicker.y, 100);
        assert.equal(coordpicker.getAttribute('y'), 100);
        assert.equal(coordpicker.root.querySelector('.thumb').style.top, coordPickerSize * 100/100 - thumbCenterOffset + 'px');
    });

    test('set coordpicker y too small', function () {
        coordpicker.setAttribute('y', -10);
        assert.equal(coordpicker.y, 0);
        assert.equal(coordpicker.getAttribute('y'), 0);
        assert.equal(coordpicker.root.querySelector('.thumb').style.top, coordPickerSize * 0/100 - thumbCenterOffset + 'px');
    });*/
});
