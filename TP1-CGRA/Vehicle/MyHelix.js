class MyHelix extends CGFobject {
    constructor(scene, rot) {
        super(scene);
        
        this.sphere = new MySphere(this.scene,16,8);

        this.initBuffers();
        
    }
    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.03, 0.03, 0.03);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.09, 0.01);
        this.scene.scale(0.02,0.07,0.02);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.09, 0.01);
        this.scene.scale(0.02,0.07,0.02);
        this.sphere.display();
        this.scene.popMatrix();
    }
}