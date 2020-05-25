#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;
uniform float nSupplysDelivered;


varying vec3 vVertexPosition;

void main() {

	float cutoff = nSupplysDelivered/5.0;
	
	if(vVertexPosition.x >= cutoff - 0.5) {
		gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
	}else {
		gl_FragColor = vec4(0.5 - vVertexPosition.x, 0.5 + vVertexPosition.x, 0.0, 1.0);
	}	
}