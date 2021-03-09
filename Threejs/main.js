THREE.Object3D.prototype.savePosition = function() {
    return function () {
        this.__position = this.position.clone(); 
        
        return this;
    }
}();




THREE.Object3D.prototype.rotateAroundPoint = function() {
    return function (point, theta, axis, pointIsWorld = false) {
    // point: Vector3 -  center of rotation
    // theta: float - rotation angle (in radians)
    // axis: Vector 3 - axis of rotation
    // pointIsWord: bool
        if(pointIsWorld){
            this.parent.localToWorld(this.position); // compensate for world coordinate
        }
    
        this.position.sub(point); // remove the offset
        this.position.applyAxisAngle(axis, theta); // rotate the POSITION
        this.position.add(point); // re-add the offset
    
        if(pointIsWorld){
            this.parent.worldToLocal(this.position); // undo world coordinates compensation
        }
    
        this.rotateOnAxis(axis, theta); // rotate the OBJECT

        return this;
    }

}();

// ThreeJS variables
var camera, scene, renderer;
// OrbitControls (camera)
var controls;
// Optional (showFps)
var stats;
// Objects in Scene
var sun, earth, moon, light, mars, mercury, venus, jupiter, saturn, uranus, netuno, ring, pluto;
// To be added 
// var moon;   
// Light in the scene 
var sunlight;


function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight); 

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 3;
    camera.position.y = 20;
    camera.lookAt( 0, 0, -4);

    // Setting up scene
    scene = new THREE.Scene();
    //Achei legal colocar um fundinho. Por favor leve como se fosse apenas uma graça.
    //Load background texture - https://stackoverflow.com/questions/19865537/three-js-set-background-image
    const loader = new THREE.TextureLoader();
    loader.load('texture/milk.jpg' , function(texture)
            {
             scene.background = texture;  
            });

    // Sun (Sphere + Light)
    sun = createSphere(8, 20, 'texture/sun.jpg');
    sun.position.z = -3;
    sun.rotation.z = 1.2

    //##########PLANETS###########

    //Mercury
    mercury = createSphere(0.3, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = -15;

    // Venus
    venus = createSphere(0.7, 20, 'texture/venus.jpg', 'Phong');
    venus.position.z = -19;

    // Earth
    earth = createSphere(1, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -26;

    // Moon
    moon = createSphere(0.3, 20, 'texture/moon.jpg', 'Phong');
    moon.position.z = -3;

    // Mars
    mars = createSphere(1.10, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -36;

    // Jupiter
    jupiter = createSphere(4, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -45;

    // Saturn
    saturn = createSphere(3, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -57;

    // Ring
    ring = createRing(4, 5.5, 100, 'texture/ring.png', 'Basic');
    ring.position.x = 0;

    // Uranus
    uranus = createSphere(2.5, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -69;

    // Netuno
    netuno = createSphere(2.6, 20, 'texture/netuno.jpg', 'Phong');
    netuno.position.z = -78;

    // plut0
    pluto = createSphere(0.2, 20, 'texture/pluto.jpg', 'Phong');
    pluto.position.z = -78;



    light = new THREE.PointLight( 0xffffff, 1.5, 90);

    earth.add(moon);
    sun.add(light);
    sun.add(mercury);
    sun.add(venus);
    sun.add(earth);
    sun.add(mars);
    sun.add(jupiter);
    sun.add(saturn);
    saturn.add(ring);
    sun.add(uranus);
    sun.add(netuno);
    sun.add(pluto);
    scene.add(sun);

    
    // Adding both renderer and stats to the Web page, also adjusting OrbitControls
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.zoomSpeed = 2;

    // Adding listener for keydown 
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Saving initial position (necessary for rotation solution)
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.savePosition();
        }
    
    } ); 
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

function onDocumentKeyDown(event) {
    console.log(event.which);
}


function animate() {
    
    requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    stats.update();
    renderer.render( scene, camera );

    //Moviments

    //Mercury
    var translation_point_Mercury= new THREE.Vector3(0, 0, 0);
    var translation_axis_Mercury = new THREE.Vector3(1, 0, 0);
    mercury.rotateAroundPoint(translation_point_Mercury, 0.004,translation_axis_Mercury,false);
    mercury.rotation.x+=2.5;

    //Venus
    var translation_point_Venus= new THREE.Vector3(0, 0, 0);
    var translation_axis_Venus = new THREE.Vector3(1, 0, 0);
    venus.rotateAroundPoint(translation_point_Venus, -0.0028,translation_axis_Venus,false);
    venus.rotation.x+=1.35;


    //Earth
    var translation_point_Earth = new THREE.Vector3(0, 0, 0);
    var translation_axis_Earth = new THREE.Vector3(1, 0, 0);
    earth.rotateAroundPoint(translation_point_Earth, 0.002,translation_axis_Earth,false);
    earth.rotation.x+=1.0;
    
    //Moon
    var translation_point_moon = new THREE.Vector3(0, 0, 0);
    var translation_axis_moon = new THREE.Vector3(1, 0, 0);
    moon.rotateAroundPoint(translation_point_moon, 1.33, translation_axis_moon,false);

    //Mars
    var translation_point_Mars= new THREE.Vector3(0, 0, 0);
    var translation_axis_Mars = new THREE.Vector3(1, 0, 0);
    mars.rotateAroundPoint(translation_point_Mars, 0.0017,translation_axis_Mars,false);
    mars.rotation.x+=0.95;

    //Jupiter
    var translation_point_Jupiter= new THREE.Vector3(0, 0, 0);
    var translation_axis_Jupiter = new THREE.Vector3(1, 0, 0);
    jupiter.rotateAroundPoint(translation_point_Jupiter, 0.0004,translation_axis_Jupiter,false);
    jupiter.rotation.x+=0.45;

    //Saturn
    var translation_point_Saturn= new THREE.Vector3(0, 0, 0);
    var translation_axis_Saturn = new THREE.Vector3(1, 0, 0);
    saturn.rotateAroundPoint(translation_point_Saturn, 0.0006,translation_axis_Saturn,false);
    saturn.rotation.x+=0.25;

    //Ring
    var translation_point_ring = new THREE.Vector3(0, 0, 0);
    var translation_axis_ring = new THREE.Vector3(0, 1, 0);
    ring.rotateAroundPoint(translation_point_ring, 0, translation_axis_ring,false);
    ring.rotation.y = Math.PI/2
    ring.rotation.x = Math.PI/2

    //Uranus
    var translation_point_Uranus= new THREE.Vector3(0, 0, 0);
    var translation_axis_Uranus = new THREE.Vector3(1, 0, 0);
    uranus.rotateAroundPoint(translation_point_Uranus, -0.0002,translation_axis_Uranus,false);
    uranus.rotation.x+=0.10;

    //Netuno
    var translation_point_Netuno = new THREE.Vector3(0, 0, 0);
    var translation_axis_Netuno = new THREE.Vector3(1, 0, 0);
    netuno.rotateAroundPoint(translation_point_Netuno, 0.0002,translation_axis_Netuno,false);
    netuno.rotation.x+=0.15;

    //pluto
    var translation_point_pluto = new THREE.Vector3(0, 0, 0);
    var translation_axis_pluto = new THREE.Vector3(1, 0, 0);
    pluto.rotateAroundPoint(translation_point_pluto, 0.0002,translation_axis_pluto,false);
    pluto.rotation.x+=0.15;

}

init();
animate();


function createSphere(radius, segments, texture_path, type = 'Basic') {
    var sphGeom = new THREE.SphereGeometry(radius, segments, segments);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture_path);
    if(type == 'Phong') {
        var sphMaterial = new THREE.MeshPhongMaterial({
            map: texture
        });
    }
    else {
        var sphMaterial = new THREE.MeshBasicMaterial({
            map: texture
        });
    }
    var sphere = new THREE.Mesh(sphGeom, sphMaterial);

    return sphere;
}

function createRing(inner_radius, outer_radius, segments, texture_path, type = 'Basic') {
    var ring_geom = new THREE.RingGeometry(inner_radius, outer_radius, segments, segments);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture_path);
    if(type == 'Phong') {
        var ring_material = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
    }
    else {
        var ring_material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
    }
    var ring1 = new THREE.Mesh(ring_geom, ring_material);

    return ring1;
}