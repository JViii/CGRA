/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.lastUpdate = 0;
        this.supplyToDrop = 0;
        this.supplys = [];
        this.nSupplysDelivered = 0;
       
        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 5);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillBoard(this);
        for(var i=0; i<5; i++) {
            this.supplys.push(new MySupply(this));
        }
        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayCylin = false;
        this.displayVehicle = true;
        this.displayCubeMap = false;
        this.displayNormals = false;
        this.displayTerrain = false;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedTexture = -1;

        this.initCubeMapTextures();
        
        // Earth Texture
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.loadTexture('/TP1-CGRA/images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.selectedTexture = 0
        this.textureIds = { 'Hill': 0, 'Desert': 1};
    }
    initCubeMapTextures() {

        //Hill Texture
        this.topTexture1 = new CGFappearance(this);
        this.topTexture1.setAmbient(100, 100, 100, 1);
        this.topTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.topTexture1.setShininess(10.0);
        this.topTexture1.loadTexture('images/split_cubemap/top.png');
        this.backTexture1 = new CGFappearance(this);
        this.backTexture1.setAmbient(255, 255, 255, 1);
        this.backTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.backTexture1.setShininess(10.0);
        this.backTexture1.loadTexture('images/split_cubemap/back.png');
        this.bottomTexture1 = new CGFappearance(this);
        this.bottomTexture1.setAmbient(255, 255, 255, 1);
        this.bottomTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomTexture1.setShininess(10.0);
        this.bottomTexture1.loadTexture('images/split_cubemap/bottom.png');
        this.frontTexture1 = new CGFappearance(this);
        this.frontTexture1.setAmbient(255, 255, 255, 1);
        this.frontTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontTexture1.setShininess(10.0);
        this.frontTexture1.loadTexture('images/split_cubemap/front.png');
        this.leftTexture1 = new CGFappearance(this);
        this.leftTexture1.setAmbient(255, 255, 255, 1);
        this.leftTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftTexture1.setShininess(10.0);
        this.leftTexture1.loadTexture('images/split_cubemap/left.png');
        this.rightTexture1 = new CGFappearance(this);
        this.rightTexture1.setAmbient(255, 255, 255, 1);
        this.rightTexture1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightTexture1.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightTexture1.setShininess(10.0);
        this.rightTexture1.loadTexture('images/split_cubemap/right.png');

        //Desert Texture
        this.topTexture2 = new CGFappearance(this);
        this.topTexture2.setAmbient(255, 255, 255, 1);
        this.topTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.topTexture2.setShininess(10.0);
        this.topTexture2.loadTexture('images/split_cubemap2/top.png');
        this.backTexture2 = new CGFappearance(this);
        this.backTexture2.setAmbient(255, 255, 255, 1);
        this.backTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.backTexture2.setShininess(10.0);
        this.backTexture2.loadTexture('images/split_cubemap2/back.png');
        this.bottomTexture2 = new CGFappearance(this);
        this.bottomTexture2.setAmbient(255, 255, 255, 1);
        this.bottomTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomTexture2.setShininess(10.0);
        this.bottomTexture2.loadTexture('images/split_cubemap2/bottom.png');
        this.frontTexture2 = new CGFappearance(this);
        this.frontTexture2.setAmbient(255, 255, 255, 1);
        this.frontTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontTexture2.setShininess(10.0);
        this.frontTexture2.loadTexture('images/split_cubemap2/front.png');
        this.leftTexture2 = new CGFappearance(this);
        this.leftTexture2.setAmbient(255, 255, 255, 1);
        this.leftTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftTexture2.setShininess(10.0);
        this.leftTexture2.loadTexture('images/split_cubemap2/left.png');
        this.rightTexture2 = new CGFappearance(this);
        this.rightTexture2.setAmbient(255, 255, 255, 1);
        this.rightTexture2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightTexture2.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightTexture2.setShininess(10.0);
        this.rightTexture2.loadTexture('images/split_cubemap2/right.png');
        
        this.texture1 = [this.topTexture1, this.backTexture1, this.bottomTexture1, this.frontTexture1, this.leftTexture1, this.rightTexture1];
        this.texture2 = [this.topTexture2, this.backTexture2, this.bottomTexture2, this.frontTexture2, this.leftTexture2, this.rightTexture2];

        this.textures = [this.texture1, this.texture2];
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(70, 70, 70), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(100.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();

        if(this.lastUpdate == 0)
            this.lastUpdate = t;

        this.vehicle.update(t);
        
        for(var i=0; i<this.supplys.length; i++)
            this.supplys[i].update(t, this.lastUpdate);
        
        this.lastUpdate = t;

        this.billboard.billboardShader.setUniformsValues({nSupplysDelivered: this.nSupplysDelivered});
    }

    display() {

        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        
        if (this.displayVehicle) {
            this.pushMatrix();
            this.vehicle.move();
            this.translate(0,10,0);
            this.vehicle.display();
            this.popMatrix();
        }

        if (this.displaySphere) {
            this.earthMaterial.apply();
            this.pushMatrix();
            this.translate(40,25,5);
            this.sphere.display();
            this.popMatrix();
        }

        if (this.displayCylin) {
            this.earthMaterial.apply();
            this.pushMatrix();
            this.translate(5,25,40);
            this.cylinder.display();
            this.popMatrix();
        }
        
        this.pushMatrix();
        this.scale(50, 50, 50);
        this.translate(0.5, 0.5, 0.5);
        this.cubeMap.display();
        this.popMatrix();
        
        this.terrain.display();
        
        for(var k=0; k<this.supplys.length; k++) {
            this.pushMatrix()
            this.supplys[k].display();
            this.popMatrix();
        }
        this.pushMatrix();
        this.translate(13, 6, 25);
        this.rotate(90*Math.PI/180, 0, 1, 0);
        this.billboard.display();
        this.popMatrix();

        

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        // Check for key codes e.g. n https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.vehicle.accelerate(0.05*this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            if((this.vehicle.velocity-0.03*this.speedFactor)>0)
                this.vehicle.accelerate(-0.03*this.speedFactor);
            else
                this.vehicle.velocity=0.00000000000000001; //corrigir este bug doutra forma
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.vehicle.turn(0.2);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            this.vehicle.turn(-0.2);
        }
        
        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;
            this.vehicle.reset();
        }

        if (this.gui.isKeyPressed("KeyP")){
            text += " P ";
            keysPressed = true;
            this.vehicle.startAutoPilot();
        }
        
        if (this.gui.isKeyPressed("KeyL")) {
            text += " L ";
            keysPressed = true;
            var pos = this.vehicle.position.slice(0);
            for(var i=0; i<this.supplys.length; i++) {
                if(this.supplys[i].state == SupplyStates.INACTIVE) {
                    this.supplys[i].drop(pos);
                    break;
                }
            }
        }
        
        if (keysPressed){
            console.log(text);
        }
        
        if(!keysPressed) {
            this.vehicle.rotRudder = 0;
        }
    }
    updateAppliedTexture(t) {
        this.textures.setTexture(this.textures[this.selectedTexture]);
    }
}