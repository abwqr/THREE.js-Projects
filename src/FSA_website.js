
import * as THREE from 'three';
import * as orbit from 'OrbitControls'
import * as gltf from 'GLTFLoader'
import * as loaders from 'Loaders'
import * as dat from 'dat'
import { BoxBufferGeometry, Material } from 'three';
import {TWEEN} from 'Tween'
function degInRad(deg) {
    return deg * Math.PI / 180;
 }

 function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true  });
    // renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    return renderer
}

const renderer = createRenderer()

document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(2000))


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10000 );
camera.position.set( 0, 300, 0 );

// camera.lookAt(0,500,0)

// const camera = cameraControl()

// function orbitControl(){
    

    const controls = new orbit.OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 305, 0 );
    // controls.target.set( 0, 0, 0 );
    controls.update();
    camera.rotation.y += degInRad(90)
    camera.rotation.x += degInRad(-90)
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [ 65, 83, 68 ];
    
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

//     return controls
// }





function lighting(x, y, z){
    const spot = new THREE.SpotLight()
    const helper = new THREE.SpotLightHelper(spot)
    // const spot = new THREE.RectAreaLight(0xffffff, 8, width, height)
    spot.position.set(x, y, z)
    scene.add(helper)
    // spot.castShadow = true
    scene.add(spot)
    return spot
}


var mat = new THREE.MeshStandardMaterial({color:'#910707'});

function floor(base){
    var material = new THREE.MeshStandardMaterial({color:'#fcd9d9'});
    var geo = new THREE.BoxGeometry( base, base, 60 );
    var plane = new THREE.Mesh(geo, material);
    plane.receiveShadow = true;
    plane.rotation.x=THREE.Math.degToRad(-90);
    plane.position.set(0, 0, 0)
    
    // plane.castShadow = true;

    scene.add(plane)
    return plane
}

function sideWalls(startx, startz, height, width, type){
    var geo = new THREE.BoxGeometry( height, width, 5 );
    var plane = new THREE.Mesh(geo, mat);
    plane.rotation.x=plane.rotation.y = Math.PI / 2;
    if(type)
        plane.position.set(startx+height, width/4, startz+0)
    else    
        plane.position.set(startx-height, width/4, startz+0)
    // plane.receiveShadow = true;
    scene.add(plane)
}


function frontWalls(startx, startz, height, width, type){

    var geo = new THREE.BoxGeometry( height, width, 5 );
    
    var plane = new THREE.Mesh(geo, mat);
    if(type)
        plane.position.set(startx+0, height/4, startz+width)
    
    else
        plane.position.set(startx+0, height/4, startz-width)


        // plane.receiveShadow = true;
    // camera.lookAt(plane.position.x, plane.position.y, plane.position.z)

    scene.add(plane)

}


const doorFrontWall = (startx, startz, height, width, type) => {
    var geo = new THREE.BoxGeometry( height/3, width, 5 );
    var plane = new THREE.Mesh(geo, mat);
    var plane2 = new THREE.Mesh(geo, mat);

    if(type){
        plane.position.set(startx+height/3, height/4, startz+width)
        plane2.position.set(startx-height/3, height/4, startz+width)
    }

    else{
        plane.position.set(startx+height/3, height/4, startz-width)
        plane2.position.set(startx-height/3, height/4, startz-width)
    }

    scene.add(plane)
    scene.add(plane2)
}

const doorSideWall = (startx, startz, height, width, type) => {
    var geo = new THREE.BoxGeometry( height, width/3, 5 );
    var plane = new THREE.Mesh(geo, mat);
    var plane2 = new THREE.Mesh(geo, mat);

    plane.rotation.x=plane.rotation.y = Math.PI / 2;
    plane2.rotation.x=plane2.rotation.y = Math.PI / 2;

    if(type){
        plane.position.set(startx+height, width/4, startz+width/3)
        plane2.position.set(startx+height, width/4, startz-width/3)
    }

    else{
        plane.position.set(startx-height, width/4, startz+width/3)
        plane2.position.set(startx-height, width/4, startz-width/3)
    }
        

    scene.add(plane)
    scene.add(plane2)
}



// const video = document.getElementById("video");
// video.onloadeddata = function () {
//     video.play();
// };

// const videoTexture = new THREE.VideoTexture(video);
// const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
// //Create screen
// const screen = new THREE.PlaneGeometry(1000, 600);
// const videoScreen = new THREE.Mesh(screen, videoMaterial);
// // videoScreen.rotation.y+=videoScreen.rotation.y+degInRad(-90)
// // scene.add(videoScreen)
// videoScreen.position.set(4000,500,-2000)




var painting = new THREE.Object3D


const logoFrame = () => {
    // const length = 265, width = 320; //logo
    var imgLoader = new THREE.TextureLoader().load('assets/images/Hamza_Art/green.png');
    var material = new THREE.MeshStandardMaterial({
    map: imgLoader
    });

    const length = 500, width = 500;
    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 20,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 20,
        bevelOffset: 2,
        bevelSegments: 20
    };


    // camera.rotation.set( 0.01,0,0 );
    const geometry = new THREE.BoxGeometry(400,430,10);
    
    const mesh = new THREE.Mesh( geometry, material ) ;
    mesh.rotation.y += mesh.rotation.y+degInRad(-90)
    mesh.receiveShadow = true
    mesh.position.set(0,570,0)

    painting.add(mesh)
}
logoFrame()

function sufiTexture(){
    var imgLoader = new THREE.TextureLoader().load('assets/images/Hamza_Art/sufi.jpg');
    var material = new THREE.MeshStandardMaterial({
        map: imgLoader
    });
    const geometry = new THREE.BoxGeometry(400,430,10);

    // const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    // const material = new THREE.MeshStandardMaterial( { color: '#170707' } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    mesh.rotation.y += mesh.rotation.y+degInRad(90)
    mesh.rotation.x += mesh.rotation.x+degInRad(90)
    mesh.rotation.y += mesh.rotation.y+degInRad(80)
    // mesh.position.set(0,0,-250)

    mesh.receiveShadow = true
    mesh.position.set(5950,220,1700)
    scene.add(mesh)
}
// painting.add(mesh)



const loader = new gltf.GLTFLoader();
let model1, model2, model3, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7       

let avatars = new THREE.Object3D
const logo = new THREE.Object3D();
let mesh = new THREE.Object3D
function structure(){
    const height = 4000
    const width = height/2
    const base = floor(height*10)
    base.position.set(200,0,200)


    sideWalls(0,0,width, height, 0)
    doorSideWall(4000,0,width, height, 0)
    frontWalls(0,0,height, width, 0)
    frontWalls(0,0,height, width, 1)

    frontWalls(4000,0,height, width, 0)
    doorFrontWall(4000,0,height, width, 1)
    frontWalls(4000,4000,height, width, 1)

    sideWalls(4000,4000,width, height, 0)
    sideWalls(4000,4000,width, height, 1)
    sideWalls(4000,0,width, height, 1)


    const spot = new THREE.RectAreaLight(0xffffff, 10, width, height)
    spot.position.set(1000,4000,4000)
    spot.rotation.y += degInRad(-90)
    scene.add(spot)
    
    const spot2 = new THREE.RectAreaLight(0xffffff, 10, width, height)
    spot2.position.set(0,4000,4000)
    scene.add(spot2)
    
    const spot3 = new THREE.RectAreaLight(0xffffff, 10, width, height)
    spot3.position.set(4000,4000,4000)
    scene.add(spot3)

    const spot4 = new THREE.RectAreaLight(0xffffff, 7, width, height)
    spot4.position.set(1000,4000,0)
    spot4.rotation.y += degInRad(90)
    // scene.add(spot4)



    function loadLogo(){
        
        const length = 300, width = 300;
        const shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );

        const extrudeSettings = {
            steps: 20,
            depth: 16,
            bevelEnabled: true,
            bevelThickness: 3,
            bevelSize: 20,
            bevelOffset: 2,
            bevelSegments: 20
        };


        // camera.rotation.set( 0.01,0,0 );
        // const geometry = new THREE.BoxGeometry(400,430,10);
        
        const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        const material = new THREE.MeshStandardMaterial( { color: '#30040b' } );
        mesh = new THREE.Mesh( geometry, material ) 
        mesh.rotation.y=THREE.Math.degToRad(90);

        // mesh.position.set(5800,500,0)//logo
        // logo.position.set(-2000,0,0)

        mesh.position.set(0,10,0)
        var box = new THREE.Box3().setFromObject( mesh );
        box.center( mesh.position ); // this re-sets the mesh position
        mesh.position.multiplyScalar( - 1 );
        



        
        scene.add( logo );
        logo.add( mesh )
    
        
        const spot = new THREE.SpotLight(0xffffff)
        const helper = new THREE.SpotLightHelper(spot)
        spot.position.set(-200,500,0)
        spot.intensity = 0.5
        spot.penumbra = 0.5
        spot.target = logo
        scene.add(spot)
        // scene.add(helper)

        const spot2 = new THREE.SpotLight(0xffffff)
        const helper2 = new THREE.SpotLightHelper(spot2)
        spot2.position.set(-800,300,-500)
        spot2.intensity = 0.5
        spot2.penumbra = 0.5
        spot2.target = logo
        scene.add(spot2)
        // scene.add(helper2)

        const spot3 = new THREE.SpotLight(0xffffff)
        const helper3 = new THREE.SpotLightHelper(spot3)
        spot3.position.set(-800,300,500)
        spot3.intensity = 0.5
        spot3.penumbra = 0.5
        spot3.target = logo
        scene.add(spot3)
        // scene.add(helper3)

        loader.load( 'assets/models/logo.gltf', 
        function ( gltf ) {
                model1 = gltf.scene;
                logo.add(model1)
                console.log(model1.position)

                gltf.scene.scale.set(15,15,15)
                gltf.scene.position.set(15,-10,0)
                // gltf.scene.position.set(5750,650,-150)//logo
                gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                gltf.scene.rotation.x=THREE.Math.degToRad(180);
                // gltf.scene.rotation.y=THREE.Math.degToRad(90);
                // mesh.add(model1)

                // model1.position.set(4000,0,0)
            }
        )   


        loader.load( 'assets/models/logo.gltf', 
        function ( gltf ) {
                model2 = gltf.scene;
                logo.add(model2)
                gltf.scene.position.set(-15,-10,0)
                gltf.scene.scale.set(15,15,15)
                // gltf.scene.position.set(3640,190,-10)//logo
                gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(180);
            }
        )

        // scene.add(mesh)
    }
    function loadStand(){
    loader.load( 'assets/models/painting_stand/scene.gltf', 
        function ( gltf ) {
                model3 = gltf.scene;
                // scene.add(model3)
                painting.add(model3)

                gltf.scene.scale.set(200,200,200)
                gltf.scene.position.set(0,200,0)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);
            }
        )  
    }


    function ECs(){
          

        loader.load( 'assets/models/hamza.glb', 
            function ( gltf ) {
                avatar3 = gltf.scene;
                // scene.add(avatar3)
                avatars.add(avatar3)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(0,30,0)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

            }
        )
        loader.load( 'assets/models/iqbala.glb', 
            function ( gltf ) {
                avatar2 = gltf.scene;
                // scene.add(avatar2)
                avatars.add(avatar2)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-300,30,200)
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                // gltf.scene.rotation.y=THREE.Math.degToRad(-90);
            }
        )
        
        loader.load( 'assets/models/chwi.glb', 
            function ( gltf ) {
                avatar1 = gltf.scene;
                avatars.add(avatar1)
                // scene.add(avatar1)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-500,30,400)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);
            }
        )
        loader.load( 'assets/models/zara.glb', 
            function ( gltf ) {
                avatar4 = gltf.scene;
                // scene.add(avatar4)
                avatars.add(avatar4)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-300,30,-200)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

            }
        )    


        loader.load( 'assets/models/saba.glb', 
            function ( gltf ) {
                avatar5 = gltf.scene;
                // scene.add(avatar5)
                avatars.add(avatar5)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-700,30,600)
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                // gltf.scene.rotation.y=THREE.Math.degToRad(-90);
            }
        )
        
        loader.load( 'assets/models/zainab.glb', 
            function ( gltf ) {
                avatar6 = gltf.scene;
                avatars.add(avatar6)
                // scene.add(avatar6)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-500,30,-400)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

            }
        )
        loader.load( 'assets/models/rubab.glb', 
            function ( gltf ) {
                avatar7 = gltf.scene;
                // scene.add(avatar7)
                avatars.add(avatar7)

                gltf.scene.scale.set(300,300,300)
                gltf.scene.position.set(-700,30,-600)
                // gltf.scene.rotation.z=THREE.Math.degToRad(-90);
                // gltf.scene.rotation.x=THREE.Math.degToRad(180);
                gltf.scene.rotation.y=THREE.Math.degToRad(90);

            }
        )    
    }


    var paintingObj = new THREE.Object3D
    function triplePainting(){

        
    


        var imgLoader = new THREE.TextureLoader().load('assets/images/Hamza_Art/left.jpeg');
        var material = new THREE.MeshStandardMaterial({
            map: imgLoader
        });
        const geometry = new THREE.BoxGeometry(800,600,10);
        const mesh = new THREE.Mesh( geometry, material ) ;
        mesh.position.set(-1000,500,-2000)
    
        mesh.receiveShadow = true
        paintingObj.add(mesh)

        const spot1 = new THREE.SpotLight(0xffffff)
        const helper = new THREE.SpotLightHelper(spot1)
        spot1.position.set(3000,1100,-1900)
        spot1.intensity = 0.5
        spot1.penumbra = 0.5
        spot1.target = mesh
        scene.add(spot1)
        // scene.add(helper)
        var imgLoader2 = new THREE.TextureLoader().load('assets/images/Hamza_Art/center.jpeg');
        var material2 = new THREE.MeshStandardMaterial({
            map: imgLoader2
        });
        const geometry2 = new THREE.BoxGeometry(800,600,10);
        const mesh2 = new THREE.Mesh( geometry2, material2 ) ;
        mesh2.position.set(0,500,-2000)
    
        // scene.add(mesh2)
        paintingObj.add(mesh2)

        const spot2 = new THREE.SpotLight(0xffffff)
        const helper2 = new THREE.SpotLightHelper(spot2)
        spot2.position.set(4000,1100,-1900)
        spot2.intensity = 0.5
        spot2.penumbra = 0.5
        spot2.target = mesh2
        scene.add(spot2)
        // scene.add(helper2)

        var imgLoader3 = new THREE.TextureLoader().load('assets/images/Hamza_Art/right.jpeg');
        var material3 = new THREE.MeshStandardMaterial({
            map: imgLoader3
        });
        const geometry3 = new THREE.BoxGeometry(800,600,10);
        const mesh3 = new THREE.Mesh( geometry3, material3 ) ;
        mesh3.position.set(1000,500,-2000)
        
        const spot3 = new THREE.SpotLight(0xffffff)
        const helper3 = new THREE.SpotLightHelper(spot3)
        spot3.position.set(5000,1100,-1900)
        spot3.intensity = 0.5
        spot3.penumbra = 0.5
        spot3.target = mesh3
        scene.add(spot3)
        // scene.add(helper3)
        // scene.add(mesh3)
        paintingObj.add(mesh3)
    }

    triplePainting()
    paintingObj.position.set(4000, 0, 0)
    scene.add(paintingObj)

    // ECs()
    // avatars.rotation.y += avatars.rotation.y+degInRad(-130)
    // avatars.position.set(1000,0,-700)
    // scene.add(avatars)

    const lightSpot = new THREE.SpotLight(0xffffff)
    lightSpot.position.set(800,300,0)
    lightSpot.intensity = 0.5
    lightSpot.penumbra = 0.5
    lightSpot.target = avatars
    scene.add(lightSpot)

    loadStand()

    const spot1 = new THREE.SpotLight(0xffffff)
    spot1.position.set(4200,300,1200)
    spot1.intensity = 0.3
    spot1.penumbra = 0.5
    spot1.target = painting
    scene.add(spot1)

    scene.add(painting)
    painting.position.set(-1000, 0, 0)
    painting.position.set(5100, 0, 1700)
    painting.rotation.y += painting.rotation.y+degInRad(130) 
    sufiTexture()
    loadLogo()
    
}

structure()
let face = 2
let angle = degInRad(90)

document.onkeydown = (e) => {
    e = e || window.event;

    var tween = new TWEEN.Tween(camera.position)


    if (e.keyCode === 40) {
        let x = 50*Math.sin(angle)
        let z = 50*Math.cos(angle)

        camera.position.x += x
        camera.position.z -= z

        camera.position.set(camera.position.x, 300, camera.position.z)
        // tween.start();
    }

    else if (e.keyCode === 37) {
        let alpha = degInRad(5)    
        camera.rotation.y += alpha
        angle -= alpha
    } 

    else if (e.keyCode === 38) {
        let x = 50*Math.sin(angle)
        let z = -50*Math.cos(angle)

        camera.position.x -= x
        camera.position.z -= z

        camera.position.set(camera.position.x, 300, camera.position.z)
    }

    else if (e.keyCode === 39) {
        let alpha = degInRad(5)    
        camera.rotation.y -= alpha
        angle += alpha
    }
}




const clock = new THREE.Clock()
// logo.translate( logo.position.x,logo.position.y,logo.position.z );
// logo.rotation.set(0,-300,0)
const rotateLogo = () => {
    new TWEEN.Tween(logo.rotation)
    .to( {
        y: logo.rotation._y + 0.5 
    })
    .start();
}
logo.position.set(-1000,500,0)


function animate() {
    
    requestAnimationFrame( animate );
    TWEEN.update()
    // rotateLogo()
    logo.rotation.y += 0.02;

    renderer.render( scene, camera );
    // obj.rotation.y -= 0.015
};

animate();
