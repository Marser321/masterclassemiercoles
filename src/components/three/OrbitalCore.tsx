"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================================
// Constantes — Revenue OS Palette (Neon/Cyan)
// ============================================================
const POINT_COUNT = 600; // Optimizado para rendimiento
const SPHERE_RADIUS = 2.5;
const BASE_COLOR = new THREE.Color("#00A3FF"); // Cyan/Blue
const HOVER_COLOR = new THREE.Color("#00D4E6"); // Refined Cyan
const BASE_SPEED = 0.05; // Cinematic slow
const HOVER_SPEED = 0.2; // Gentle acceleration

// ============================================================
// Esfera orbital de puntos de luz
// ============================================================
function OrbitalSphere() {
    const pointsRef = useRef<THREE.Points>(null!);
    const materialRef = useRef<THREE.PointsMaterial>(null!);
    const isHovered = useRef(false);
    const currentSpeed = useRef(BASE_SPEED);
    const currentColor = useRef(new THREE.Color("#00A3FF"));

    // Generar puntos en la superficie de una esfera (distribución Fibonacci)
    const [positions] = useState(() => {
        const pos = new Float32Array(POINT_COUNT * 3);
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < POINT_COUNT; i++) {
            const theta = (2 * Math.PI * i) / goldenRatio;
            const phi = Math.acos(1 - (2 * (i + 0.5)) / POINT_COUNT);

            // Agregar variación de radio para efecto orgánico
            const r = SPHERE_RADIUS * (0.85 + Math.random() * 0.3);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    });



    useFrame((state, delta) => {
        if (!pointsRef.current || !materialRef.current) return;

        // Interpolar velocidad de rotación
        const targetSpeed = isHovered.current ? HOVER_SPEED : BASE_SPEED;
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.02; // Very smooth ease

        // Rotación suave
        pointsRef.current.rotation.y += delta * currentSpeed.current;
        pointsRef.current.rotation.x += delta * currentSpeed.current * 0.2;

        // Interpolar color
        const targetColor = isHovered.current ? HOVER_COLOR : BASE_COLOR;
        currentColor.current.lerp(targetColor, 0.02);
        materialRef.current.color.copy(currentColor.current);

        // Efecto de "respiración" — escala sutil
        const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
        pointsRef.current.scale.setScalar(breathe);
    });

    const handlePointerEnter = useCallback(() => {
        isHovered.current = true;
    }, []);

    const handlePointerLeave = useCallback(() => {
        isHovered.current = false;
    }, []);

    return (
        <points
            ref={pointsRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={POINT_COUNT}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                color={BASE_COLOR}
                size={0.035}
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ============================================================
// Anillos orbitales (decorativos)
// ============================================================
function OrbitalRings() {
    const ring1Ref = useRef<THREE.Mesh>(null!);
    const ring2Ref = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z += delta * 0.05;
            ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z -= delta * 0.03;
            ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
        }
    });

    return (
        <>
            <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
                <ringGeometry args={[3.2, 3.22, 128]} />
                <meshBasicMaterial
                    color="#00A3FF"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
                <ringGeometry args={[3.6, 3.62, 128]} />
                <meshBasicMaterial
                    color="#00F3FF"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </>
    );
}

// ============================================================
// Canvas wrapper exportado
// ============================================================
export default function OrbitalCore() {
    return (
        <div
            className="absolute inset-0 z-0"
            aria-hidden="true"
        >
            <Canvas
                camera={{ position: [0, 0, 7], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: "transparent" }}
            >
                <OrbitalSphere />
                <OrbitalRings />
            </Canvas>
        </div>
    );
}
