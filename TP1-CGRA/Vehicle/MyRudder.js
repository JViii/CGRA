class MyRudder extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.quad = new MyQuad(this.scene);
        this.equiTriangle = new MyEquiTriangle(this.scene);
        
        this.initBuffers();
    }
    display() {

        this.scene.pushMatrix();
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.equiTriangle.display();
        this.scene.popMatrix();
    }
}