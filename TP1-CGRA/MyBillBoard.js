class MyBillBoard extends CGFobject{
	constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(this.scene, 20, 0, 1, 0, 1);
        this.support = new MyPlane(this.scene, 20, 0, 1, 0, 1);
        this.loadBar = new MyPlane(this.scene, 20, 0, 1, 0, 1);
        
        this.billboardAppearance = new CGFappearance(this.scene);
        this.billboardTexture = new CGFtexture(this.scene, 'images/Billboard/BillboardTexture.png');
        this.billboardAppearance.setAmbient(1, 1, 1, 1.0);
        this.billboardAppearance.setTexture(this.billboardTexture);
        this.billboardAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.grey = new CGFappearance(this.scene);
        this.greyText = new CGFtexture(this.scene, 'images/Billboard/Grey.png');
        this.grey.setAmbient(1, 1, 1, 1.0);
        this.grey.setTexture(this.greyText);
        this.grey.setTextureWrap('REPEAT', 'REPEAT');

        this.billboardShader = new CGFshader(this.scene.gl, 'shaders/billboard.vert', 'shaders/billboard.frag');


        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1, 1, 1, 1.0);
    }
	display() {

        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.billboardAppearance.apply();
        this.plane.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.white.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.grey.apply();
        this.support.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.grey.apply();
        this.support.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.grey.apply();
        this.support.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.grey.apply();
        this.support.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.billboardShader);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.loadBar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}