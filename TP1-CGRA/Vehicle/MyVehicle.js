/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.ang = 0;			//orientacao em torno do eixo dos YY
		this.pilotAngle = 0;
		this.velocity=0.00000000000000001;
		this.position = [0, 10, 0];
		this.deltaTime=0;
		this.lastUpdate=0;
		this.rotHelix = 0;
		this.rotRudder = 0;
		this.autoPilot= false;
		
		this.cylinder = new MyCylinder(this.scene, 6);
		this.sphere = new MySphere(this.scene, 16, 8);
		this.rudder = new MyRudder(this.scene);
		this.helix = new MyHelix(this.scene, 10);
		this.flag = new MyPlane(this.scene,15,0,1,0,1);

		//flag
		this.flagShader = new CGFshader(this.scene.gl, 'shaders/flag.vert', 'shaders/flag.frag');
		this.flagShader.setUniformsValues({ uSampler3: 3 });
		this.flagShader.setUniformsValues({ timeFactor : 0 });
		this.flagShader.setUniformsValues({ speed : 0 });

		this.flagTexture = new CGFtexture(this.scene, 'images/flag.png');
		
		//vehicle
		this.vehicleTexture = new CGFtexture(this.scene,'images/vehicle.jpg');
		this.vehicleAppearance = new CGFappearance(this.scene);
		this.vehicleAppearance.setAmbient(1 ,1 ,1 , 1.0);
        this.vehicleAppearance.setTexture(this.vehicleTexture);
		this.vehicleAppearance.setTextureWrap('REPEAT', 'REPEAT');
	}
	display() {
		
		if(this.rotRudder == NaN) {
			this.rotRudder = 0;
		}
		this.vehicleAppearance.apply();

		//body
		this.scene.pushMatrix();
		this.scene.scale(0.9,0.9,1.7);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.9,-0.7);
		this.scene.rotate(90*Math.PI/180,1,0,0);
		this.scene.scale(0.17,0.6,0.17);
		this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.9,0.5);
		this.scene.scale(0.14,0.15,0.15);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.9,-0.7);
		this.scene.scale(0.14,0.15,0.15);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.2,-0.95,-0.7);
		this.scene.scale(0.08,0.08,0.2);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.2,-0.95,-0.7);
		this.scene.scale(0.08,0.08,0.2);
		this.sphere.display();
		this.scene.popMatrix();

		//rudder
		this.scene.pushMatrix();
		this.scene.translate(0.6, 0, -1.7);
		this.scene.rotate(90*Math.PI/180,1,0,0);
		this.scene.scale(0.6,0.6,0.6);
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.6, 0, -1.7);
		this.scene.rotate(90*Math.PI/180, 1, 0, 0);
		this.scene.scale(0.6,0.6,0.6);
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, -1.4);
		this.scene.rotate(this.rotRudder*Math.PI/180, 0, 1, 0);
        this.scene.scale(0.6,0.6,0.6);
        this.scene.translate(0, 0, -1);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.rudder.display();
		this.scene.popMatrix();
		

		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, -1.3);
		this.scene.rotate(this.rotRudder*Math.PI/180, 0, 1, 0);
        this.scene.scale(0.6,0.6,0.6);
        this.scene.translate(0, 0, -1);
        this.scene.rotate(90*Math.PI/180, 0, 0, 1);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.rudder.display();
		this.scene.popMatrix();
		
		//helix
		this.scene.pushMatrix();
		this.scene.translate(0.2, -0.95, -0.9);
		this.scene.rotate(this.rotHelix*Math.PI/180,0, 0, 1);
		this.helix.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.2, -0.95, -0.9);
		this.scene.rotate(this.rotHelix*Math.PI/180,0, 0, 1);
		this.helix.display();
		this.scene.popMatrix();

		//flag
		this.flagTexture.bind(3);
		this.scene.setActiveShader(this.flagShader);

		this.scene.pushMatrix();
		this.scene.translate(0,0,-4);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(2,1,1);
		this.flag.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-4);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(2,1,1);
		this.flag.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);

	}
	update(t) {

		this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
		this.flagShader.setUniformsValues({ speed : this.velocity });

		if(this.lastUpdate == 0)
        	this.lastUpdate = t;

		if(this.deltaTime == 0)
			this.deltaTime = t/1000;

		if(this.autoPilot)
			this.moveAutoPilot();
		else{
			if(this.velocity != 0) {
				this.position[0] += this.velocity * Math.sin(this.ang);
				this.position[2] += this.velocity * Math.cos(this.ang);
			}
		}
		this.rotHelix += 20*this.velocity;

		this.deltaTime = (t - this.lastUpdate)/1000;
		this.lastUpdate = t;
	}

	turn(val) {
		this.ang += val;
		this.rotRudder = 35*val/Math.abs(val);
	}
	
	accelerate(val) {
		this.velocity += val;
	}
	reset() {
		this.autoPilot=false;
		this.ang = 0;
		this.velocity=0.00000000000000001;
		this.position = [0, 10, 0];
		for(var i=0; i<5; i++) {
			this.scene.supplys[i].reset();
		}
		
	}
	move() {
		if(this.velocity > 0){
			this.scene.translate(this.position[0], 0, this.position[2]);
		}
		this.scene.rotate(this.ang, 0, 1, 0);
	}
	
	startAutoPilot(){
		if(!this.autoPilot){
			this.autoPilot=true;
			this.pilotAngle = 0;
			this.position=[5,10,0];
			this.ang=Math.PI;
		}
		else{
			this.autoPilot=false;
		}
	}

	moveAutoPilot(){
		let radius = 5;
		let T = 5;
		let w = 2*Math.PI / T;

		this.pilotAngle+=(w*this.deltaTime);
		if(this.pilotAngle>=2*Math.PI)
			this.pilotAngle=0;
		this.ang=-this.pilotAngle;
		this.position=[Math.cos(this.pilotAngle)*radius,10,Math.sin(this.pilotAngle)*radius];
	}

	enableNormalViz = function enableNormalViz() {
        this.cilinder.enableNormalViz();
        this.sphere.enableNormalViz();
        
    }
    disableNormalViz = function disableNormalViz() {
        this.cilinder.disableNormalViz();
        this.sphere.disableNormalViz();
	}
	
}

