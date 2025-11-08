import * as THREE from 'three'

export interface BackgroundConfig {
  containerId?: string
  container?: HTMLElement
  particleSize?: number
  rotationSpeed?: number
  timeSpeed?: number
}

export interface BackgroundInstance {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  points: THREE.Points
  material: THREE.ShaderMaterial
  animationId: number | null
  cleanup: () => void
}

// 顶点着色器
const vertexShader = `
  attribute float seed;
  uniform float time;
  
  void main() {
    vec3 pos = position;
    // 使用 seed 和时间创建波浪效果
    pos.y = sin((pos.x + pos.z) * 0.1 + time * 0.5 + seed * 0.01) * 2.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 2.0;
  }
`

// 片段着色器
const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  
  void main() {
    // 创建从青色到洋红色的渐变
    float ratio = (gl_FragCoord.x / resolution.x + gl_FragCoord.y / resolution.y) / 2.0;
    vec3 color1 = vec3(0.0, 1.0, 1.0); // cyan
    vec3 color2 = vec3(1.0, 0.0, 1.0); // magenta
    
    vec3 color = mix(color1, color2, ratio);
    
    // 添加发光效果
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= 0.8;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function createBackground(
  config: BackgroundConfig = {}
): BackgroundInstance | null {
  const {
    containerId,
    container,
    particleSize = 90,
    rotationSpeed = 0.003,
    timeSpeed = 0.5,
  } = config

  // 优先使用直接传递的容器元素，否则通过ID查找
  let wrapper: HTMLElement | null = null
  if (container) {
    wrapper = container
  } else if (containerId) {
    wrapper = document.getElementById(containerId)
  } else {
    wrapper = document.getElementById('app')
  }

  if (!wrapper) {
    console.error('Container not found')
    return null
  }

  const width = wrapper.clientWidth || window.innerWidth
  const height = wrapper.clientHeight || window.innerHeight

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0) // 透明背景

  // 设置 canvas 样式，确保它在最底层
  const canvas = renderer.domElement
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '0'
  canvas.style.pointerEvents = 'none'
  
  // 将 canvas 添加到容器的第一个位置，确保它在最底层
  if (wrapper.firstChild) {
    wrapper.insertBefore(canvas, wrapper.firstChild)
  } else {
    wrapper.appendChild(canvas)
  }

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.y = 10
  camera.position.z = 40
  camera.rotation.x = -1

  // 创建场景
  const scene = new THREE.Scene()

  // 创建材质
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(width, height) },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
  })

  // 创建几何体
  const geometry = new THREE.BufferGeometry()
  const positions: number[] = []
  const seeds: number[] = []

  const absolute = particleSize
  for (let z = -absolute; z < absolute; z += 2) {
    for (let x = -absolute; x < absolute; x += 2) {
      positions.push(x, 0, z)
      seeds.push(z + x)
    }
  }

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  )
  geometry.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1))

  // 创建点系统
  const points = new THREE.Points(geometry, material)
  scene.add(points)

  // 动画循环
  let animationId: number | null = null
  let time = 0

  const render = (): void => {
    time += timeSpeed
    points.rotation.y += rotationSpeed
    material.uniforms.time.value = time
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(render)
  }

  render()

  // 响应式处理
  const handleResize = (): void => {
    const newWidth = wrapper.clientWidth || window.innerWidth
    const newHeight = wrapper.clientHeight || window.innerHeight

    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
    console.log('执行了么？？？')

    // 更新分辨率uniform
    material.uniforms.resolution.value.set(newWidth, newHeight)
  }

  window.addEventListener('resize', handleResize)

  // 清理函数
  const cleanup = (): void => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', handleResize)

    if (wrapper && renderer.domElement.parentNode === wrapper) {
      wrapper.removeChild(renderer.domElement)
    }

    renderer.dispose()
    geometry.dispose()
    material.dispose()
  }

  return {
    renderer,
    scene,
    camera,
    points,
    material,
    animationId,
    cleanup,
  }
}

// 默认导出，方便在 main.ts 中调用
export default createBackground
