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
let mixer: THREE.AnimationMixer | null = null
let clock: THREE.Clock | null = null

const initScene = () => {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建多个几何体
  const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.ConeGeometry(0.3, 0.6, 8),
    new THREE.TorusGeometry(0.3, 0.1, 16, 100),
  ]

  const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00]

  const group = new THREE.Group()

  geometries.forEach((geometry, index) => {
    const material = new THREE.MeshStandardMaterial({
      color: colors[index],
      metalness: 0.8,
      roughness: 0.2,
      emissive: colors[index],
      emissiveIntensity: 0.3,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (index - 1.5) * 1.5
    group.add(mesh)
  })

  scene.add(group)

  // 创建关键帧动画
  const times = [0, 2, 4, 6, 8]
  const positions: number[][] = []
  const rotations: number[][] = []

  times.forEach((time, index) => {
    const angle = (time / 8) * Math.PI * 2
    positions.push([
      Math.sin(angle) * 2,
      Math.cos(angle) * 2,
      0,
    ])
    rotations.push([0, angle, 0])
  })

  const positionKF = new THREE.VectorKeyframeTrack(
    '.position',
    times,
    positions.flat()
  )

  const rotationKF = new THREE.QuaternionKeyframeTrack(
    '.quaternion',
    times,
    rotations.flat().map((r) => {
      const quaternion = new THREE.Quaternion()
      quaternion.setFromEuler(new THREE.Euler(r[0], r[1], r[2]))
      return [quaternion.x, quaternion.y, quaternion.z, quaternion.w]
    }).flat()
  )

  const clip = new THREE.AnimationClip('Action', 8, [positionKF, rotationKF])
  mixer = new THREE.AnimationMixer(group)
  const action = mixer.clipAction(clip)
  action.play()

  clock = new THREE.Clock()

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

    if (mixer && clock) {
      mixer.update(clock.getDelta())
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
  if (mixer) mixer.stopAllAction()
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
})
</script>

