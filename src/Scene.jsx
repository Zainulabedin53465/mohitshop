import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Sparkles, ContactShadows } from '@react-three/drei'

function Sack({ color = '#e6c48f', label = '#c0392b' }) {
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.9, 1.1, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.65, 0.22, 0.38]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.6, 0.285]}>
        <planeGeometry args={[0.62, 0.48]} />
        <meshStandardMaterial color={label} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.6, 0.29]}>
        <circleGeometry args={[0.13, 32]} />
        <meshStandardMaterial color="#ffd36b" emissive="#ffb400" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function Bottle({ color = '#f2c230' }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.27, 0.3, 1.0, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.15} metalness={0.1} clearcoat={1} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.1, 0.27, 0.4, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.16, 24]} />
        <meshStandardMaterial color="#c0392b" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.55, 0.0]}>
        <cylinderGeometry args={[0.305, 0.305, 0.4, 32, 1, true]} />
        <meshStandardMaterial color="#fff6dc" roughness={0.7} side={2} />
      </mesh>
    </group>
  )
}

function Jar({ color = '#a8321f' }) {
  return (
    <group>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.8, 32]} />
        <meshPhysicalMaterial color="#e8f1f5" roughness={0.05} transmission={0.6} thickness={0.4} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.68, 32]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.12, 32]} />
        <meshStandardMaterial color="#ffd36b" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  )
}

function TeaBox({ color = '#2e7d4f' }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1.0, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.62, 0.255]}>
        <planeGeometry args={[0.6, 0.45]} />
        <meshStandardMaterial color="#fff1c9" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.62, 0.26]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <boxGeometry args={[0.82, 0.05, 0.52]} />
        <meshStandardMaterial color="#ffd36b" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Tin({ color = '#d98a1f' }) {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.7, 40]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 40]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.385, 0.385, 0.25, 40, 1, true]} />
        <meshStandardMaterial color="#fff6dc" roughness={0.6} side={2} />
      </mesh>
    </group>
  )
}

function Product({ type, color, label }) {
  if (type === 'sack') return <Sack color={color} label={label} />
  if (type === 'bottle') return <Bottle color={color} />
  if (type === 'jar') return <Jar color={color} />
  if (type === 'tea') return <TeaBox color={color} />
  return <Tin color={color} />
}

function Shop() {
  const stripes = useMemo(() => Array.from({ length: 8 }, (_, i) => i), [])
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[3.2, 1.9, 2.2]} />
        <meshStandardMaterial color="#f4e3c1" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[3.6, 0.22, 2.6]} />
        <meshStandardMaterial color="#b5452a" roughness={0.7} />
      </mesh>
      {stripes.map((i) => (
        <mesh key={i} position={[-1.4 + i * 0.4, 1.55, 1.45]} rotation={[0.55, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.9]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#c0392b' : '#fff1c9'} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 2.55, 0.9]}>
        <boxGeometry args={[2.4, 0.5, 0.12]} />
        <meshStandardMaterial color="#2a1a0a" emissive="#ffb400" emissiveIntensity={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.55, 0.97]}>
        <boxGeometry args={[2.2, 0.32, 0.02]} />
        <meshStandardMaterial color="#ffd36b" emissive="#ffc933" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.7, 1.11]}>
        <boxGeometry args={[0.7, 1.3, 0.05]} />
        <meshStandardMaterial color="#5b3a1e" roughness={0.6} />
      </mesh>
      <mesh position={[-1.05, 0.95, 1.12]}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#ffe9a8" emissive="#ffc766" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[1.05, 0.95, 1.12]}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#ffe9a8" emissive="#ffc766" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 0.08, 1.35]}>
        <boxGeometry args={[3.4, 0.16, 0.6]} />
        <meshStandardMaterial color="#8a6a45" roughness={0.9} />
      </mesh>
    </group>
  )
}

const ITEMS = [
  { type: 'sack', color: '#e6c48f', label: '#c0392b' },
  { type: 'bottle', color: '#f2c230' },
  { type: 'jar', color: '#a8321f' },
  { type: 'tea', color: '#2e7d4f' },
  { type: 'tin', color: '#d98a1f' },
  { type: 'sack', color: '#cfa56a', label: '#2e7d4f' },
  { type: 'jar', color: '#e0a33a' },
  { type: 'bottle', color: '#7a4a2b' }
]

function Ring() {
  const group = useRef()
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.08
  })
  return (
    <group ref={group}>
      {ITEMS.map((item, i) => {
        const a = (i / ITEMS.length) * Math.PI * 2
        const r = 4.4
        return (
          <Float key={i} speed={1.4 + (i % 3) * 0.3} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[0, 0.3]}>
            <group position={[Math.sin(a) * r, 0.1, Math.cos(a) * r]} rotation={[0, a, 0]} scale={1.25}>
              <Product {...item} />
            </group>
          </Float>
        )
      })}
    </group>
  )
}

function Rig({ progress }) {
  useFrame((state, dt) => {
    const p = progress.current
    const a = p * Math.PI * 1.7 + 0.15
    const r = 11 - p * 3
    const y = 2.2 + Math.sin(p * Math.PI) * 2.6
    const k = Math.min(1, dt * 2.5)
    const tx = Math.sin(a) * r + state.pointer.x * 0.8
    const tz = Math.cos(a) * r
    const ty = y + state.pointer.y * 0.4
    state.camera.position.x += (tx - state.camera.position.x) * k
    state.camera.position.y += (ty - state.camera.position.y) * k
    state.camera.position.z += (tz - state.camera.position.z) * k
    state.camera.lookAt(0, 1.2, 0)
  })
  return null
}

export default function Scene({ progress }) {
  return (
    <Canvas camera={{ position: [0, 2.2, 11], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color attach="background" args={['#0b0a14']} />
      <fog attach="fog" args={['#0b0a14', 12, 32]} />
      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#ffe9c0', '#201533', 0.7]} />
      <directionalLight position={[6, 9, 6]} intensity={2.2} color="#ffd9a0" />
      <pointLight position={[0, 3.5, 4]} intensity={60} color="#ffb84d" />
      <pointLight position={[-6, 2, -4]} intensity={40} color="#6a5bff" />

      <Stars radius={60} depth={40} count={2500} factor={4} fade speed={0.6} />
      <Sparkles count={90} scale={[16, 7, 16]} size={3} speed={0.4} color="#ffd36b" position={[0, 2, 0]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[8.5, 96]} />
        <meshStandardMaterial color="#1a1426" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[3.5, 3.6, 128]} />
        <meshStandardMaterial color="#ffd36b" emissive="#ffb400" emissiveIntensity={1.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[5.4, 5.45, 128]} />
        <meshStandardMaterial color="#8d7bff" emissive="#6a5bff" emissiveIntensity={1.2} />
      </mesh>

      <Shop />
      <Ring />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={20} blur={2.4} far={6} />
      <Rig progress={progress} />
    </Canvas>
  )
}
