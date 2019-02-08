/// <reference path="libs/three.min.js" />
/// <reference path="libs/trackballcontrols.js" />
//name: Narendra
//date: January 11, 2019
//file: lab01.js

//recurrent const
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();

//global variables
var trackballControls;
var ambientLight,spotLight,pointLight,directionalLight,recareaLight,hemisphereLight;
let planeMaterial;
let angle = 0;
let icosahedronMaterial;

//function definitions
function init() {
    //the renderer
    renderer.setClearColor(new THREE.Color(0X0095DE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    trackballControls =  new THREE.TrackballControls( camera, renderer.domElement)
}

//Setting camera and lights
function setupCameraAndLight() {
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    //Setting ambient light
    ambientLight = new THREE.AmbientLight( 0x404040 ); 
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    //Setting spotlight
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 100,1000, 100 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    //Setting point light
    pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
    pointLight.position.set( 50, 50, 50 );
    pointLight.castShadow = true;
    scene.add(pointLight);

    //Setting direction light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    //Setting hemisphere light
    hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    hemisphereLight.position. set( 0 , 500 , 0 );
    hemisphereLight.castShadow = true;
    scene.add(hemisphereLight);
    
    //Setting recarea light
    recareaLight = new THREE.RectAreaLight( 0xffffff, 1,  10, 10 );
    recareaLight.position.set( 5, 5, 0 );
    recareaLight.lookAt( 0, 0, 0 );
    recareaLight.castShadow = true;
    scene.add( recareaLight )
}

//function to create shapes
function createGeometry() {
    //Creating plane
   let planeGeometry = new THREE.PlaneGeometry(50, 40, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({color : 0x42f450});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.55* Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.castShadow = true;
    plane.receiveShadow = true;

    //Creating a cube
  /*  let cubeGeometry = new THREE.BoxGeometry(20, 5, 10);
    let cubeMaterial = new THREE.MeshLambertMaterial({color : 0x00ff00});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.rotation.x = 0;
    cube.position.x = 20;
    cube.position.y = 15;
    cube.position.z = 0;
    cube.castShadow = true;
    cube.receiveShadow = true;

    //Creating a sphere 
    let sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    let sphereMaterial = new THREE.MeshPhongMaterial({color: 0x66aa66, specular: 0x0000ff}); 
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.rotation.x = 0;
    sphere.position.x = 10;
    sphere.position.y = 5;
    sphere.position.z = 0;
    
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    scene.add(plane);
    scene.add(cube);
    scene.add(sphere);*/

    let icosahedronGeometry = new THREE.IcosahedronGeometry(10,0);
     icosahedronMaterial = new THREE.MeshPhongMaterial({color : 0xF3FFE2,
        specular: 0xff0000,
        shininess: 100,
        shading: THREE.FlatShading});
    let icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.rotation.x = Date.now() * 0.0005;
    icosahedron.rotation.y = Date.now() * 0.001;

    icosahedron.position.x = 20;
    icosahedron.position.y = 0;
    icosahedron.position.z = 0;
    icosahedron.castShadow = true;
    icosahedron.receiveShadow = true;



    scene.add(plane);

    scene.add(icosahedron);


    
}

//Loading GUI for handling lights
function loadGUI(){
    control = new function(){
    
        this.aoMapIntensity = 2.0
       
        this.bumpscale=0;
       
        this.emissive=0xde8e6d;
       
        this.shininess=30;
       
        this.refractionRatio=0.98
       
        this.skinning = false;

        this.wireframe = false;

        this.wireframeLinewidth = 1.0;

        /*this.AmbientLight= true;
        this.ambientColor=0xc3663f;
        
        this.SpotLight= true;
        this.spotColor=0xc3663f;

        this.PointLight= true;
        this.pointColor=0xc3663f;

        this.DirectionalLight= true;
        this.directionalColor=0xc3663f;

        this.RecAreaLight = true;
        this.areaColor=0xc3663f;

        this.HemisphereLight = true;

        this.skyColor=0xc3663f;
        this.groundColor=0xc3663f;*/
    }
    var gui = new dat.GUI();

    gui.add(control,'aoMapIntensity',1.0,3.5)
    .onChange((c) => {icosahedronMaterial.aoMapIntensity=c;});
    
    gui.add(control,'bumpscale',0.0,1.0)
    .onChange((c) => {icosahedronMaterial.bumpscale=c;});
    
    gui.addColor(control,'emissive').name('Emissive Color')
    .onChange((c) => {icosahedronMaterial.emissive=c;});

    gui.add(control,'shininess',5.0,30.0).name('Shineness')
    .onChange((c) => {icosahedronMaterial.shininess=c;});

    gui.add(control,'refractionRatio',0.01,30).name('Refraction Ratio')
    .onChange((c) => {icosahedronMaterial.refractionRatio=c;});

    gui.add(control,'skinning').name('Skinning')
    .onChange((c) => {icosahedronMaterial.skinning=c;});

    gui.add(control,'wireframe').name('Wire Frame')
    .onChange((c) => {icosahedronMaterial.wireframe=c;});

    gui.add(control,'wireframeLinewidth',0.01,1.0).name('Wireframe Linewidth')
    .onChange((c) => {icosahedronMaterial.wireframeLinewidth=c;});










  /*  gui.add(control, 'AmbientLight').onChange((c) => {ambientLight.visible = c;});
    gui.addColor(control, 'ambientColor').name('Ambient Color')
    .onChange((c) => {ambientLight.color = new THREE.Color(c);}); 
  
    gui.add(control, 'SpotLight').onChange((c) => {spotLight.visible = c;});;
    gui.addColor(control, 'spotColor').name('Spot Color')
    .onChange((c) => {spotLight.color = new THREE.Color(c);});

    gui.add(control, 'PointLight').onChange((c) => {pointLight.visible = c;});;
    gui.addColor(control, 'pointColor').name('Point Color')
    .onChange((c) => {pointLight.color = new THREE.Color(c);});

    gui.add(control, 'DirectionalLight').onChange((c) => {directionalLight.visible = c;});;
    gui.addColor(control, 'directionalColor').name('Directional Color')
    .onChange((c) => {directionalLight.color = new THREE.Color(c);});

    gui.add(control, 'RecAreaLight').onChange((c) => {recareaLight.visible = c;});;
    gui.addColor(control, 'areaColor').name('Area Color')
    .onChange((c) => {recareaLight.color = new THREE.Color(c);});

    gui.add(control, 'HemisphereLight').onChange((c) => {hemisphereLight.visible = c;});;

    gui.addColor(control, 'skyColor').name('Sky Color')
    .onChange((c) => {renderer.setClearColor(new THREE.Color(c));});

    gui.addColor(control, 'groundColor').name('Ground Color')
    .onChange((c) => {planeMaterial.color = new THREE.Color(c);});*/
}

//function for the render
function render() {
    //update the controlls
    trackballControls.update(clock.getDelta());
    renderer.render(scene, camera);

    //in the render function 
   // scene.rotation.y = angle += 0.1; 

    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

       // Increment by 
    loadGUI();   
    init();
    setupCameraAndLight();
    createGeometry();
    render();
    
}
