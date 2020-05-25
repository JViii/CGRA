#define PI 3.1415926538

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float speed;

varying vec2 vTextureCoord;
uniform sampler2D uSampler3;

void main() {
	
	vTextureCoord = aTextureCoord;
	vec3 offset= vec3(0,0,0);

	if(speed>0.1)
		offset = vec3(0, 0, speed*0.5*sin(timeFactor+vTextureCoord));
	else 
		offset = vec3(0, 0, 0.1*sin(timeFactor+vTextureCoord));

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
