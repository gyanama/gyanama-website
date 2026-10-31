'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStory, usePrefersReducedMotion, hasWebGL, type Phase } from './story';
import { HeroPoster } from './HeroPoster';

export type FieldTheme = {
  base: string;
  alert: string;
  good: string;
  arc: string;
};

export type FieldLayout = 'field' | 'register' | 'wide';

type Props = {
  theme: FieldTheme;
  layout?: FieldLayout;
  className?: string;
};

function buildGrid(layout: FieldLayout, compact: boolean) {
  const cols = layout === 'wide' ? (compact ? 16 : 34) : compact ? 14 : 22;
  const rows = layout === 'register' ? (compact ? 9 : 12) : compact ? 10 : 14;
  const gap = layout === 'register' ? 0.42 : 0.36;
  const pts: THREE.Vector3[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jitter = layout === 'register' ? 0 : (Math.sin(r * 12.9898 + c * 78.233) * 43758.5453) % 1;
      const x = (c - (cols - 1) / 2) * gap + jitter * 0.05;
      const z = (r - (rows - 1) / 2) * gap - jitter * 0.05;
      pts.push(new THREE.Vector3(x, 0, z));
    }
  }
  const alertCol = layout === 'wide' ? 0.42 : layout === 'register' ? 0.66 : 0.3;
  const alertIndex = Math.floor(rows * 0.45) * cols + Math.floor(cols * alertCol);
  return { pts, alertIndex };
}

const dummy = new THREE.Object3D();

function phaseColor(phase: Phase, theme: FieldTheme) {
  if (phase === 'alert' || phase === 'calling' || phase === 'talk') return theme.alert;
  if (phase === 'logged') return theme.good;
  return theme.base;
}

function Dots({ theme, layout, compact }: { theme: FieldTheme; layout: FieldLayout; compact: boolean }) {
  const { phase } = useStory();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const phaseStart = useRef(0);
  const { pts, alertIndex } = useMemo(() => buildGrid(layout, compact), [layout, compact]);
  const baseColor = useMemo(() => new THREE.Color(theme.base), [theme.base]);
  const target = useMemo(() => new THREE.Color(), []);
  const current = useMemo(() => new THREE.Color(theme.base), [theme.base]);

  const arcLine = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const mat = new THREE.LineBasicMaterial({ color: theme.arc, transparent: true, opacity: 0.9 });
    const line = new THREE.Line(geom, mat);
    return line;
  }, [theme.arc]);

  const arcPoints = useMemo(() => {
    const start = pts[alertIndex].clone();
    const end = new THREE.Vector3(start.x + 2.6, 1.4, start.z + 0.6);
    const mid = new THREE.Vector3((start.x + end.x) / 2, 2.2, (start.z + end.z) / 2);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const p = curve.getPoints(64);
    arcLine.geometry.setFromPoints(p);
    arcLine.geometry.setDrawRange(0, 0);
    return p.length;
  }, [pts, alertIndex, arcLine]);

  useEffect(() => {
    phaseStart.current = performance.now();
    target.set(phaseColor(phase, theme));
  }, [phase, theme, target]);

  useEffect(() => {
    if (!mesh.current) return;
    for (let i = 0; i < pts.length; i++) mesh.current.setColorAt(i, baseColor);
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [pts, baseColor]);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    const since = (performance.now() - phaseStart.current) / 1000;
    const active = phase === 'alert' || phase === 'calling' || phase === 'talk';
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const wave = layout === 'register' ? Math.sin(t * 0.8 + p.x * 0.5) * 0.025 : Math.sin(t * 0.9 + p.x * 0.55 + p.z * 0.35) * 0.07;
      dummy.position.set(p.x, p.y + wave, p.z);
      let s = 1;
      if (i === alertIndex) {
        s = active ? 1.7 + Math.sin(t * 6) * 0.25 : phase === 'logged' ? 1.5 : 1;
        dummy.position.y += active ? 0.12 : 0;
      }
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    current.lerp(target, 0.12);
    m.setColorAt(alertIndex, current);
    if (m.instanceColor) m.instanceColor.needsUpdate = true;

    const drawn = phase === 'calling' ? Math.min(1, since / 1.1) : phase === 'talk' ? 1 : phase === 'logged' ? Math.max(0, 1 - since / 1.2) : 0;
    arcLine.geometry.setDrawRange(0, Math.floor(drawn * arcPoints));

    if (ring.current) {
      const r = ring.current;
      const pulse = phase === 'alert' ? (since % 0.9) / 0.9 : phase === 'logged' && since < 0.9 ? since / 0.9 : 0;
      r.visible = pulse > 0;
      r.scale.setScalar(0.4 + pulse * 2.2);
      (r.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - pulse);
      (r.material as THREE.MeshBasicMaterial).color.set(phase === 'logged' ? theme.good : theme.alert);
      r.position.set(pts[alertIndex].x, 0.01, pts[alertIndex].z);
    }
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, pts.length]}>
        <sphereGeometry args={[0.062, 14, 14]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <mesh ref={ring} rotation-x={-Math.PI / 2} visible={false}>
        <ringGeometry args={[0.16, 0.2, 48]} />
        <meshBasicMaterial transparent toneMapped={false} />
      </mesh>
      <primitive object={arcLine} />
    </group>
  );
}

function Rig({ layout }: { layout: FieldLayout }) {
  const base = useMemo(
    () => (layout === 'register' ? new THREE.Vector3(0, 6.2, 3.6) : layout === 'wide' ? new THREE.Vector3(-1.2, 4.6, 8.4) : new THREE.Vector3(0, 5.4, 7.2)),
    [layout],
  );
  const placed = useRef(false);
  useFrame(({ camera, pointer }) => {
    if (!placed.current) {
      camera.position.copy(base);
      placed.current = true;
    }
    camera.position.x += (base.x + pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (base.y + pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.position.z += (base.z - camera.position.z) * 0.04;
    camera.lookAt(layout === 'wide' ? -1.2 : 0, layout === 'field' ? -0.8 : 0, layout === 'field' ? -0.4 : 0);
  });
  return null;
}

export function StudentField({ theme, layout = 'field', className }: Props) {
  const reduced = usePrefersReducedMotion();
  const [webgl] = useState(() => hasWebGL());
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(() => window.innerWidth < 768);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onResize = () => setCompact(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => {
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (reduced || !webgl || navigator.webdriver) {
    return <HeroPoster theme={theme} layout={layout} className={className} />;
  }

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.8, 5.6], fov: layout === 'wide' ? 42 : 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Rig layout={layout} />
        <Dots theme={theme} layout={layout} compact={compact} />
      </Canvas>
    </div>
  );
}
