attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;


void main() {
	
	vVertexPosition = aVertexPosition;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}

