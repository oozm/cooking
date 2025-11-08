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
let mesh: THREE.Mesh | null = null

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;
    float dist = length(p);
    
    // 创建波纹效果
    float wave = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
    
    // 渐变颜色（青色到洋红色）
    vec3 color1 = vec3(0.0, 1.0, 1.0);
    vec3 color2 = vec3(1.0, 0.0, 1.0);
    
    vec3 color = mix(color1, color2, wave);
    
    // 添加发光效果
    float glow = 1.0 / (1.0 + dist * 2.0);
    color += glow * 0.5;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const initScene = () => {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 2

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建平面几何体
  const geometry = new THREE.PlaneGeometry(4, 4, 32, 32)

  // 创建着色器材质
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(width, height) },
    },
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // 动画循环
  let time = 0
  const animate = () => {
    time += 0.01
    animationId = requestAnimationFrame(animate)

    if (mesh && mesh.material instanceof THREE.ShaderMaterial) {
      mesh.material.uniforms.time.value = time
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

    if (mesh && mesh.material instanceof THREE.ShaderMaterial) {
      mesh.material.uniforms.resolution.value.set(width, height)
    }
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
  if (mesh) {
    mesh.geometry.dispose()
    if (mesh.material instanceof THREE.Material) {
      mesh.material.dispose()
    }
  }
})
</script>

