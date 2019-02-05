/// <reference path="libs/three.min.js" />

//author: Narendra Pershad January 9, 2019
//filename: 02-first-scene.js

//declare global variables
var scene,
    renderer,
    camera;

//function definitions
function init() {
    //to setup the three.js/WebGL environment
    //1. create the THREE.Scene object
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    //2. create and initialize the THREE.WebGLRenderer
    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //3. add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    //this is invoked once
}

function createCameraAndLights() {
    //1. create and initialize the camera
    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    //2. create and initialize light (if needed)
    //this is invoked once

}

function createGeometry() {
    //to create the required object in your scene
    //this is invoked once
    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000,
        wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // position the cube
    cube.position.set(-4, 3, 0);

    // add the cube to the scene
    scene.add(cube);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777FF,
        wireframe: true
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.set(20, 4, 2);

    // add the sphere to the scene
    scene.add(sphere);



    //create a cylinder
    var cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 20, 22 );
var cylinderMaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

 // position the cylinder
    cylinder.position.set(10, 5, 2);
    scene.add( cylinder );


    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight(),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
 
    // set position of spotLight,
    // and helper bust be updated when doing that
    spotLight.position.set(100, 200, -100);
    spotLightHelper.update();
}

function animate() {
    //to animate the scene
    //this is invoked continuously
    renderer.render(scene, camera);

    //the last statement calls itself
    requestAnimationFrame(animate);
}

//javascript function to drive your scene
window.onload = () => {
    init();
    createCameraAndLights();
    createGeometry();
    animate();
}
