"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================================
// Constantes de configuración
// ============================================================
const PARTICLE_COUNT = 80;
const SPREAD = 12;
const CONNECTION_DISTANCE = 2.2;
const PARTICLE_COLOR = new THREE.Color("#00D4FF");
const LINE_COLOR = new THREE.Color("#00D4FF");
const ROTATION_SPEED = 0.03;
const MOUSE_INFLUENCE = 0.4;

// ============================================================
// Componente interno — Partículas + Líneas
// ============================================================
function Particles() {
    const groupRef = useRef<THREE.Group>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);
    const mouseCurrent = useRef({ x: 0, y: 0 });

    // Generar posiciones aleatorias una sola vez
    const [positions] = useState(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * SPREAD;
            pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
            pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
        }
        return pos;
    });

    // Buffer para las líneas de conexión (máx posible)
    const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = useMemo(
        () => new Float32Array(maxLines * 6),
        [maxLines]
    );
    const lineOpacities = useMemo(
        () => new Float32Array(maxLines * 2),
        [maxLines]
    );



    useFrame((state, delta) => {
        if (!groupRef.current || !linesRef.current) return;

        // Interpolar mouse suavemente (state.pointer ya está normalizado -1 a 1)
        mouseCurrent.current.x += (state.pointer.x - mouseCurrent.current.x) * 0.05;
        mouseCurrent.current.y += (state.pointer.y - mouseCurrent.current.y) * 0.05;

        // Rotación base + influencia del mouse
        groupRef.current.rotation.y += delta * ROTATION_SPEED;
        groupRef.current.rotation.x =
            mouseCurrent.current.y * MOUSE_INFLUENCE * 0.3;
        groupRef.current.rotation.z =
            mouseCurrent.current.x * MOUSE_INFLUENCE * 0.15;

        // Calcular líneas de conexión
        const geo = linesRef.current.geometry;
        const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
        const opacityAttr = geo.getAttribute("opacity") as THREE.BufferAttribute;
        let lineIndex = 0;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < CONNECTION_DISTANCE) {
                    const opacity = 1 - dist / CONNECTION_DISTANCE;

                    posAttr.array[lineIndex * 6] = positions[i * 3];
                    posAttr.array[lineIndex * 6 + 1] = positions[i * 3 + 1];
                    posAttr.array[lineIndex * 6 + 2] = positions[i * 3 + 2];
                    posAttr.array[lineIndex * 6 + 3] = positions[j * 3];
                    posAttr.array[lineIndex * 6 + 4] = positions[j * 3 + 1];
                    posAttr.array[lineIndex * 6 + 5] = positions[j * 3 + 2];

                    opacityAttr.array[lineIndex * 2] = opacity * 0.15;
                    opacityAttr.array[lineIndex * 2 + 1] = opacity * 0.15;

                    lineIndex++;
                }
            }
        }

        // Ocultar líneas no usadas
        for (let i = lineIndex; i < maxLines; i++) {
            opacityAttr.array[i * 2] = 0;
            opacityAttr.array[i * 2 + 1] = 0;
        }

        geo.setDrawRange(0, lineIndex * 2);
        posAttr.needsUpdate = true;
        opacityAttr.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            {/* Nodos / Partículas */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                        count={PARTICLE_COUNT}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color={PARTICLE_COLOR}
                    size={0.04}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Líneas de conexión */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                        count={maxLines * 2}
                    />
                    <bufferAttribute
                        attach="attributes-opacity"
                        args={[lineOpacities, 1]}
                        count={maxLines * 2}
                    />
                </bufferGeometry>
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    vertexShader={`
            attribute float opacity;
            varying float vOpacity;
            void main() {
              vOpacity = opacity;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
                    fragmentShader={`
            uniform vec3 uColor;
            varying float vOpacity;
            void main() {
              gl_FragColor = vec4(uColor, vOpacity);
            }
          `}
                    uniforms={{
                        uColor: { value: LINE_COLOR },
                    }}
                />
            </lineSegments>
        </group>
    );
}

// ============================================================
// Componente exportado — Canvas wrapper
// ============================================================
export default function ParticleNetwork() {
    return (
        <div
            className="absolute inset-0 z-0"
            aria-hidden="true"
        >
            <Canvas
                camera={{ position: [0, 0, 7], fov: 60 }}
                dpr={[1, 1.25]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
