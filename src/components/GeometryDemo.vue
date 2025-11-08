<template>
  <div ref="containerRef" class="w-full h-full relative"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null
let meshes: THREE.Mesh[] = []

const initScene = () => {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 10)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建多种几何体
  const geometries = [
    { type: 'box', geo: new THREE.BoxGeometry(1, 1, 1), pos: [-3, 2, 0] },
    { type: 'sphere', geo: new THREE.SphereGeometry(0.7, 32, 32), pos: [0, 2, 0] },
    { type: 'cone', geo: new THREE.ConeGeometry(0.7, 1.4, 8), pos: [3, 2, 0] },
    { type: 'torus', geo: new THREE.TorusGeometry(0.5, 0.2, 16, 100), pos: [-3, -2, 0] },
    { type: 'octahedron', geo: new THREE.OctahedronGeometry(0.7, 0), pos: [0, -2, 0] },
    { type: 'tetrahedron', geo: new THREE.TetrahedronGeometry(0.7, 0), pos: [3, -2, 0] },
  ]

  const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00, 0xff0000, 0x0000ff]

  geometries.forEach((item, index) => {
    const material = new THREE.MeshStandardMaterial({
      color: colors[index],
      metalness: 0.8,
      roughness: 0.2,
      emissive: colors[index],
      emissiveIntensity: 0.4,
      wireframe: false,
    })

    const mesh = new THREE.Mesh(item.geo, material)
    mesh.position.set(item.pos[0], item.pos[1], item.pos[2])
    scene.add(mesh)
    meshes.push(mesh)
  })

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100)
  pointLight1.position.set(5, 5, 5)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100)
  pointLight2.position.set(-5, -5, 5)
  scene.add(pointLight2)

  // 动画循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    meshes.forEach((mesh, index) => {
      mesh.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1)
      mesh.rotation.y += 0.01 * (index % 2 === 0 ? 1 : -1)
    })

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  // 响应式处理
  const handleResize = () => {
    if (!containerRef.value || !camera || !renderer) return

    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}

let cleanupFn: (() => void) | null = null

onMounted(() => {
  cleanupFn = initScene()
})

onUnmounted(() => {
  if (cleanupFn) cleanupFn()
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  if (renderer && containerRef.value) {
    try {
      containerRef.value.removeChild(renderer.domElement)
    } catch (e) {
      // Element already removed
    }
  }
  if (renderer) {
    renderer.dispose()
  }
  meshes.forEach((mesh) => {
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material && Array.isArray(mesh.material)) {
      mesh.material.forEach((mat) => mat.dispose())
    } else if (mesh.material) {
      ;(mesh.material as THREE.Material).dispose()
    }
  })
})
</script>

