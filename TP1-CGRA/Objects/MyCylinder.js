/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var aglInit = 0;
        var aglAtual = 2*Math.PI/this.slices;
        var divText = 1/this.slices;

        var xtext = 0;
        
        //Para cada lado(retangulo)
        for(var i=0; i<this.slices; i++) {
            
            var xai = Math.cos(aglInit);
            var zai = Math.sin(aglInit);
            var xaa = Math.cos(aglAtual+aglInit);
            var zaa = Math.sin(aglAtual+aglInit);
            
            
            this.vertices.push(xai, 2, -zai);
            this.vertices.push(xai, 0, -zai); 
            this.vertices.push(xaa, 2, -zaa); 
            this.vertices.push(xaa, 0, -zaa); 
            
            this.indices.push(4*i, 4*i+1, 4*i+2);
            this.indices.push(4*i+2, 4*i+1, 4*i+3);
            
            this.normals.push(
                xai, 0, -zai,
                xai, 0, -zai,
                xaa, 0, -zaa,
                xaa, 0, -zaa
            );
            
           this.texCoords.push(
                xtext, 0,    
                xtext, 1,
                divText+xtext, 0,
                divText+xtext, 1
            );
            
            xtext += divText;
            aglInit += aglAtual;
        }
        
        this.normals.push(
            Math.cos(aglInit), 2, -Math.sin(aglInit),
            Math.cos(aglInit), 0, -Math.sin(aglInit)
        );
        
        this.texCoords.push(
            1, 0,
            1, 1
        );

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}