<template>
  <div
    ref="containerRef"
    class="w-full h-full rounded-2xl overflow-hidden relative"
  ></div>
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

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建几何体 - 钻石形状
  const geometry = new THREE.OctahedronGeometry(1, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x004444,
    emissiveIntensity: 0.5,
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  meshes.push(mesh)

  // 创建第二个几何体 - 立方体
  const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0x440044,
    emissiveIntensity: 0.4,
  })

  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.position.x = 2.5
  scene.add(cubeMesh)
  meshes.push(cubeMesh)

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 添加点光源
  const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100)
  pointLight1.position.set(5, 5, 5)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100)
  pointLight2.position.set(-5, -5, 5)
  scene.add(pointLight2)

  // 添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10, 0x00ffff, 0x004444)
  scene.add(gridHelper)

  // 添加粒子系统
  const particleCount = 200
  const particles = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 10

    const color = new THREE.Color()
    if (Math.random() > 0.5) {
      color.setHex(0x00ffff)
    } else {
      color.setHex(0xff00ff)
    }
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  })

  const particleSystem = new THREE.Points(particles, particleMaterial)
  scene.add(particleSystem)
  meshes.push(particleSystem as unknown as THREE.Mesh)

  // 动画循环
  let time = 0
  const animate = () => {
    time += 0.01
    animationId = requestAnimationFrame(animate)

    if (meshes[0]) {
      meshes[0].rotation.x += 0.01
      meshes[0].rotation.y += 0.01
    }

    if (meshes[1]) {
      meshes[1].rotation.x -= 0.01
      meshes[1].rotation.y -= 0.01
    }

    // 相机旋转
    if (camera) {
      camera.position.x = Math.sin(time * 0.3) * 2
      camera.position.y = Math.cos(time * 0.2) * 2
      camera.lookAt(0, 0, 0)
    }

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

  // 清理函数
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

