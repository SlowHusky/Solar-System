function createSphere(radius, segments, texture_path, type = 'Basic') {
    var sphere_geom = new THREE.SphereGeometry(radius, segments, segments);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture_path);
    if(type == 'Phong') {
        var sphere_material = new THREE.MeshPhongMaterial({
            map: texture
        });
    }
    else {
        var sphere_material = new THREE.MeshBasicMaterial({
            map: texture
        });
    }
    var sphere = new THREE.Mesh(sphere_geom, sphere_material);

    return sphere;
}


function createRing(inner_radius, outer_radius, segments, texture_path, type = 'Basic') {
    var ring_geom = new THREE.RingGeometry(inner_radius, outer_radius, segments, segments);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture_path);
    if(type == 'Phong') {
        var ring_material = new THREE.MeshPhongMaterial({
            map: texture
        });
    }
    else {
        var ring_material = new THREE.MeshBasicMaterial({
            map: texture
        });
    }
    var ring = new THREE.Mesh(ring_geom, ring_material);

    return ring;
}



// Rotation around point logic
// Based on https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733

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