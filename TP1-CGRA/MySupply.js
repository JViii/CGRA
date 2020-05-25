/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

 const SupplyStates = {
    INACTIVE : 0,
    FALLING : 1,
    LANDED : 2
};

class MySupply extends CGFobject {
    
    constructor(scene) {
        super(scene);
        
        this.quad = new MyQuad(this.scene);
        this.state = SupplyStates.INACTIVE;
        this.speed = 0;
        this.SupplyPosition = [0, 10, 0];
        
        //Falling Textures
        //Top/Bottom Tecture
        this.supplyTextture = new CGFappearance(this.scene);
        this.supplyTextture.setAmbient(1, 1, 1, 1.0);
        this.supplyTextture.loadTexture('images/wooden_box/Bottom_top.png');

        //Side Texture
        this.supplyTexttureSide = new CGFappearance(this.scene);
        this.supplyTexttureSide.setAmbient(1, 1, 1, 1.0);
        this.supplyTexttureSide.loadTexture('images/wooden_box/side.png');


        //Landed Textures
        this.Opensupply = new CGFappearance(this.scene);
        this.Opensupply.setAmbient(1, 1, 1, 1.0);
        this.Opensupply.loadTexture('images/wooden_box/openBox.png');
    }
    display() {
        
        if(this.state == SupplyStates.FALLING) {
            this.Fallingdisplay();
        }else if(this.state == SupplyStates.LANDED) {
            this.displayOnLand();
        }
    }
    Fallingdisplay() {
        
        var sca = [this.scene.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scene.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scene.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        
        this.scene.multMatrix(sca);
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.supplyTexttureSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.rotate(90 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.supplyTexttureSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.rotate(180 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.supplyTexttureSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.rotate(270 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.supplyTexttureSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(0,-0.5,0);
        this.scene.translate(0,0.5,0);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.supplyTextture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(0,0.5,0);
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-90 * Math.PI / 180,1, 0, 0);
        this.scene.rotate(180*Math.PI/ 180, 0, 1, 0);
        this.supplyTextture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.land();
    }
    displayOnLand() {

        var sca = [this.scene.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scene.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scene.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        
        this.scene.multMatrix(sca);
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(0,0,0.5);
        this.scene.translate(0,0,0.5);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.Opensupply.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(0,0,-1);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.Opensupply.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(-1,0,0);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.Opensupply.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(1,0,0);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.Opensupply.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.translate(2, 0, 1.5);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.supplyTextture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(this.SupplyPosition[0], this.SupplyPosition[1], this.SupplyPosition[2]); //the fall
        this.scene.rotate(-90 * Math.PI / 180,1, 0, 0);
        this.scene.rotate(180*Math.PI/ 180, 0, 1, 0);
        this.Opensupply.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
    }
    update(t, previousT) {
        var deltaTime = (t - previousT) / 1000;
        var deltaDistance = deltaTime * this.speed;
        if(this.state == SupplyStates.FALLING) {
            this.SupplyPosition[1] = this.SupplyPosition[1] - deltaDistance;
        }
    }
    drop(dropPosition) {
        this.state = SupplyStates.FALLING;
        this.SupplyPosition = dropPosition;
        this.SupplyPosition[1] = this.SupplyPosition[1] - 0.3;
        this.SupplyPosition[2] = this.SupplyPosition[2] - 0.5;
        this.speed = 10/3;
        this.scene.nSupplysDelivered++;
    }
    land() {
        if(this.SupplyPosition[1] <= 1 && this.state == SupplyStates.FALLING){
            this.state = SupplyStates.LANDED;
        }
    }
    reset() {
        this.state = SupplyStates.INACTIVE;
        this.SupplyPosition = [0, 10, 0];
        this.scene.nSupplysDelivered = 0;    
    }
    
}