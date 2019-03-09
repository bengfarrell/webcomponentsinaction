import Template from './template.js';

export default class Scene extends HTMLElement {
    static get observedAttributes() {
        return ['object', 'color', 'alpha'];
    }

    set color(val) {
        this.setAttribute('color', val);
    }

    get color() {
        return this.getAttribute('color');
    }

    set alpha(val) {
        this.setAttribute('alpha', val);
    }

    get alpha() {
        return parseFloat(this.getAttribute('alpha'));
    }

    set object(val) {
        this.setAttribute('object', val);
    }

    get object() {
        return this.getAttribute('object');
    }

    attributeChangedCallback(name, oldVal, newValue) {
        switch (name) {
            case 'alpha':
                this.updateColor();
                break;

            case 'color':
                this.updateColor();
                break;

            case 'object':
                this.switchMesh(newValue);
                break;
        }
    }


    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);
        this.initScene();
    }

    initScene() {
        this.engine = new BABYLON.Engine(this.dom.scene, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0.894, 0.894, 0.894);

        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), this.scene);
        const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);
        camera.attachControl(this.dom.scene, true);

        this.engine.runRenderLoop( () => this.render() );
        window.addEventListener('resize', () => this.onResize());
    }

    render() {
        this.scene.render();
    }

    onResize() {
        this.engine.resize();
    }

    updateColor() {
        if (!this.currentMesh) {
            return;
        }
        const material = new BABYLON.StandardMaterial('material', this.scene);
        if (this.color) {
            material.diffuseColor = new BABYLON.Color3.FromHexString(this.color);
        }
        if (this.alpha) {
            material.alpha = this.alpha/100;
        }
        this.currentMesh.material = material;
    }

    switchMesh(mesh) {
        if (this.currentMesh) {
            this.currentMesh.dispose();
        }
        switch (mesh) {
            case 'sphere':
                this.currentMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {}, this.scene);
                break;

            case 'cube':
                this.currentMesh = BABYLON.MeshBuilder.CreateBox("cube", {}, this.scene);
                break;

            case 'geodesic':
                this.currentMesh = BABYLON.MeshBuilder.CreateSphere("sphere", { segments: 2 }, this.scene);
                break;
        }
        this.updateColor();
    }
}

if (!customElements.get('mc-scene')) {
    customElements.define('mc-scene', Scene);
}
