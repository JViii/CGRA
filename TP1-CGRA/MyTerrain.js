/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene,20,0,1,0,1);
        this.initBuffers();

            //Terrain
            this.terrainShader = new CGFshader(this.scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
            this.terrainShader.setUniformsValues({ uSampler1: 1 });
            this.terrainShader.setUniformsValues({ uSampler2: 2 });
            this.terrainTexture = new CGFtexture(this.scene,'images/terrain.jpg');
            this.terrainMap = new CGFtexture(this.scene,'images/heightmap2.jpg');
    }
    display(){
        this.terrainMap.bind(1);
        this.terrainTexture.bind(2);

        this.scene.setActiveShader(this.terrainShader);

        this.scene.pushMatrix();
        this.scene.rotate(-90*Math.PI/180,1,0,0);
        this.scene.translate(25,-25, 0.5); 
        this.scene.scale(50, 50, 50);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}