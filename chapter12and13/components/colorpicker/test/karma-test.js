suite('color picker', function() {
    const coordPickerSize = 500;
    const thumbCenterOffset = 5/2 + 3; // width/2 + left border
    const container = document.createElement('div');
    container.innerHTML = `<script type="module" src="../src/colorpicker.js"></script>
                           <wcia-color-picker style="width: ${coordPickerSize}px; height: ${coordPickerSize}px" hex="#000000" alpha="0"></wcia-color-picker>`;

    document.body.appendChild(container);
    const colorpicker = container.querySelector('wcia-color-picker');

    test('colorpicker get initial color state', function () {
        assert.equal(colorpicker.root.querySelector('.textInputR').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputG').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputB').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputA').value, 0);
    });

    test('colorpicker set color to red', function () {
        colorpicker.hex = '#ff0000';
        assert.equal(colorpicker.root.querySelector('.textInputR').value, 255);
        assert.equal(colorpicker.root.querySelector('.textInputG').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputB').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputA').value, 0);
    });

    test('colorpicker set color to blue', function () {
        colorpicker.hex = '#0000ff';
        assert.equal(colorpicker.root.querySelector('.textInputR').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputG').value, 0);
        assert.equal(colorpicker.root.querySelector('.textInputB').value, 255);
        assert.equal(colorpicker.root.querySelector('.textInputA').value, 0);
    });

    test('colorpicker set alpha', function () {
        colorpicker.alpha = 50;
        assert.equal(colorpicker.root.querySelector('.textInputA').value, 50);
    });
});
