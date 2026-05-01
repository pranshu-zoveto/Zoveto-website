"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function canRunWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    return maxTexture >= 4096;
  } catch {
    return false;
  }
}

export function HeroBrain() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canRunWebGL());
  }, []);

  useEffect(() => {
    if (!enabled || !hostRef.current) return;
    const host = hostRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 300);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const nodeCount = isMobile ? 40 : 80;
    const radius = 180;
    const blue = new THREE.Color("#0071E3");
    const teal = new THREE.Color("#34C759");
    const muted = new THREE.Color("#D2D2D7");
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i += 1) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963229728653;
      points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
    }

    const geo = new THREE.SphereGeometry(3, isMobile ? 8 : 16, isMobile ? 8 : 16);
    const mat = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.9 });
    const instanced = new THREE.InstancedMesh(geo, mat, nodeCount);
    const dummy = new THREE.Object3D();
    points.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
      const color = i < nodeCount * 0.72 ? blue : i < nodeCount * 0.92 ? teal : muted;
      instanced.setColorAt(i, color);
    });
    scene.add(instanced);

    const edgeGeo = new THREE.BufferGeometry();
    const edgeVertices: number[] = [];
    const maxDist = 80;
    const maxConnections = isMobile ? 80 : 200;
    let links = 0;
    for (let i = 0; i < points.length && links < maxConnections; i += 1) {
      for (let j = i + 1; j < points.length && links < maxConnections; j += 1) {
        if (points[i].distanceTo(points[j]) <= maxDist) {
          edgeVertices.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
          links += 1;
        }
      }
    }
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgeVertices, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.15 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const pointA = new THREE.PointLight(0x0071e3, 1.2);
    pointA.position.set(200, 200, 100);
    scene.add(pointA);
    const pointB = new THREE.PointLight(0x34c759, 0.8);
    pointB.position.set(-200, -100, 50);
    scene.add(pointB);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let running = true;
    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const animate = (time: number) => {
      if (!running) {
        raf = window.requestAnimationFrame(animate);
        return;
      }
      scene.rotation.y += 0.0015;
      scene.rotation.x += 0.0004;
      camera.position.x += ((mouse.x * 12) - camera.position.x) * 0.03;
      camera.position.y += ((-mouse.y * 12) - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      edges.rotation.y = time * 0.00012;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      geo.dispose();
      mat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(0,113,227,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(52,199,89,0.14),transparent_55%)]"
        aria-hidden
      />
    );
  }

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
