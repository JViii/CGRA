/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        
    }

    display() {
        
        var sca = [this.scene.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scene.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scene.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        
        this.scene.multMatrix(sca);
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.textures[this.scene.selectedTexture][1].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(90 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0,0.5);
        this.scene.textures[this.scene.selectedTexture][4].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(180 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0,0.5);
        this.scene.textures[this.scene.selectedTexture][3].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(270 * Math.PI / 180,0,1,0);
        this.scene.translate(0,0,0.5);
        this.scene.textures[this.scene.selectedTexture][5].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(90 * Math.PI / 180,1,0,0);
        this.scene.textures[this.scene.selectedTexture][2].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-90 * Math.PI / 180,1,0,0);
        this.scene.textures[this.scene.selectedTexture][0].apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}

