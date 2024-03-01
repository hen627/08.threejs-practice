import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = { // by using inner we get the size of the whole viewport instead of a set value like 800 px
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => { //listens for the resize event, native javascript listener.
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //the above updates the previously declared values based on the new resizing window.

    // Update camera to the new resized window size.
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix() //very important to update the projectionmatrix

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // this adjusts the pixelratio to the devices pixelratio to render for what ratio the device has.
    // the math.min value with make it so that the first property is compared to the second property, aka window.devicePixelRatio can be a value from 0-2, 2 being the limit declared in the second property.
    // if the device pixelratio is higher than 2, it will still only render with 2. The reason for this is optimization, for example some phones etc have a pixel ratio of 5.
    // A higher pixelratio means a higher load on your gpu, and the higher pixelratios are usually on the weaker devices. Limiting is necessary for optimizing for those devices.
})  // the reason for having the setPixelratio in the resize event, is so that the pixelRatio updates if you for example move the window to a new screen, as the new screen can have a different pixel ratio.

window.addEventListener('dblclick', () => { // listens for doubleclick so we can enter and leave fullscreen, the canvas is what goes fullscreen
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }
    else{
        document.exitFullscreen()
    }

})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()