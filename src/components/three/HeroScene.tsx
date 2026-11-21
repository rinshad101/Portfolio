'use client'

import { Environment, Lightformer, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

/* ───────── Static geometry data, generated once at module load (client only) ───────── */

const PARTICLE_COUNT = 420

function makeParticles(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Points distributed in a wide flattened shell around the chip.
    const r = 3 + Math.random() * 4.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
    arr[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 1.5
  }
  return arr
}

const PARTICLES = makeParticles(PARTICLE_COUNT)

/** Circuit traces running from the die to the chip edges. */
const TRACES: Array<{ pos: [number, number, number]; size: [number, number, number] }> = (() => {
  const out: Array<{ pos: [number, number, number]; size: [number, number, number] }> = []
  const offsets = [-0.42, -0.25, -0.08, 0.08, 0.25, 0.42]
  for (const o of offsets) {
    const len = 0.45 + Math.abs(o) * 0.35
    out.push({ pos: [0.62 + len / 2, o, 0.02], size: [len, 0.018, 0.012] })
    out.push({ pos: [-0.62 - len / 2, o, 0.02], size: [len, 0.018, 0.012] })
    out.push({ pos: [o, 0.62 + len / 2, 0.02], size: [0.018, len, 0.012] })
    out.push({ pos: [o, -0.62 - len / 2, 0.02], size: [0.018, len, 0.012] })
  }
  return out
})()

/** Gold-ish pins along the four outer edges. */
const PIN_COUNT_PER_SIDE = 11
const PINS: Array<[number, number, number, boolean]> = (() => {
  const out: Array<[number, number, number, boolean]> = []
  for (let i = 0; i < PIN_COUNT_PER_SIDE; i++) {
    const t = -1 + (2 * (i + 0.5)) / PIN_COUNT_PER_SIDE
    const p = t * 0.95
    out.push([p, 1.32, 0, false], [p, -1.32, 0, false], [1.32, p, 0, true], [-1.32, p, 0, true])
  }
  return out
})()

function useGlowTexture() {
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.25, 'rgba(255,255,255,0.45)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)
    }
    return new THREE.CanvasTexture(canvas)
  }, [])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

interface CoreProps {
  ready: boolean
  accent: string
}

function ProcessorCore({ ready, accent }: CoreProps) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const pins = useRef<THREE.InstancedMesh>(null)
  const appear = useRef(0)
  const glow = useGlowTexture()

  useEffect(() => {
    const mesh = pins.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    PINS.forEach(([x, y, z, vertical], i) => {
      m.makeScale(vertical ? 0.16 : 0.05, vertical ? 0.05 : 0.16, 0.05)
      m.setPosition(x, y, z)
      mesh.setMatrixAt(i, m)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    appear.current = THREE.MathUtils.damp(appear.current, ready ? 1 : 0, 2.4, dt)
    const a = appear.current
    g.scale.setScalar(0.001 + a * 0.999)

    const t = state.clock.elapsedTime
    const targetY = t * 0.12 + state.pointer.x * 0.45 + (1 - a) * 1.4
    const targetX = 0.38 - state.pointer.y * 0.28
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.2, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.2, dt)
    g.position.y = Math.sin(t * 0.8) * 0.06

    if (core.current) {
      core.current.rotation.x += dt * 0.35
      core.current.rotation.y += dt * 0.5
    }
    if (ring.current) ring.current.rotation.z -= dt * 0.15
  })

  return (
    <group ref={group} scale={0.001}>
      {/* Glow halo behind the chip */}
      <sprite position={[0, 0, -0.8]} scale={[3.8, 3.8, 1]}>
        <spriteMaterial map={glow} color={accent} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      {/* Glass package */}
      <RoundedBox args={[2.5, 2.5, 0.42]} radius={0.16} smoothness={5}>
        {/* Tinted translucent glass: no transmission pass, so it stays cheap and predictable on a transparent canvas. */}
        <meshPhysicalMaterial
          transparent
          opacity={0.32}
          depthWrite={false}
          roughness={0.06}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color="#c7d2fe"
          envMapIntensity={1.4}
        />
      </RoundedBox>

      {/* Silicon die */}
      <RoundedBox args={[1.18, 1.18, 0.16]} radius={0.04} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color="#121828" metalness={0.85} roughness={0.28} emissive={accent} emissiveIntensity={0.18} />
      </RoundedBox>

      {/* Die grid lines */}
      <gridHelper args={[1.0, 8, '#67E8F9', '#2b3550']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.085]} />

      {/* Circuit traces */}
      {TRACES.map((tr, i) => (
        <mesh key={i} position={tr.pos}>
          <boxGeometry args={tr.size} />
          <meshBasicMaterial color={i % 3 === 0 ? '#67E8F9' : accent} toneMapped={false} />
        </mesh>
      ))}

      {/* Pins */}
      <instancedMesh ref={pins} args={[undefined, undefined, PINS.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c9d2e8" metalness={1} roughness={0.25} />
      </instancedMesh>

      {/* Floating energy core */}
      <mesh ref={core} position={[0, 0, 0.62]}>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshBasicMaterial color="#67E8F9" wireframe toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.62]}>
        <icosahedronGeometry args={[0.12, 2]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ring} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[1.95, 0.006, 8, 160]} />
        <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.05) * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLES, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#67E8F9" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

const ACCENT_HEX = { purple: '#8B5CF6', cyan: '#38BDF8', green: '#4ADE80' } as const

export interface HeroSceneProps {
  ready: boolean
  accent: keyof typeof ACCENT_HEX
}

export default function HeroScene({ ready, accent }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const color = ACCENT_HEX[accent]

  // Stop rendering entirely when the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0 [mask-image:radial-gradient(closest-side,#000_70%,transparent)]">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-3, -2, 2]} intensity={6} color={color} />
        <ProcessorCore ready={ready} accent={color} />
        <Particles />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, 4, 3]} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={1.4} color={color} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#38BDF8" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
          <Lightformer form="ring" intensity={1.5} color="#67E8F9" position={[0, 0, -6]} scale={4} />
        </Environment>
      </Canvas>
    </div>
  )
}
