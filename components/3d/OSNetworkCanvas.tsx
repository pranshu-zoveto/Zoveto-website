"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODES = [
  { name: "Finance", c: "#0071E3", x: -60, y: 40, z: -20 },
  { name: "CRM", c: "#0071E3", x: -10, y: 70, z: 20 },
  { name: "Inventory", c: "#0071E3", x: 40, y: 50, z: -10 },
  { name: "Warehouse", c: "#0071E3", x: 70, y: 10, z: 10 },
  { name: "Lead AI", c: "#34C759", x: -70, y: -10, z: 20 },
  { name: "MIS AI", c: "#34C759", x: -30, y: -45, z: 15 },
  { name: "Stock AI", c: "#34C759", x: 20, y: -55, z: -10 },
  { name: "Payments AI", c: "#34C759", x: 70, y: -30, z: 10 },
];

export function OSNetworkCanvas() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const host = hostRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 1000);
    camera.position.set(0, 0, 240);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const a = new THREE.PointLight(0x0071e3, 1);
    a.position.set(100, 80, 120);
    scene.add(a);
    const b = new THREE.PointLight(0x34c759, 0.8);
    b.position.set(-100, -60, 80);
    scene.add(b);

    const meshes: THREE.Mesh[] = [];
    const core = new THREE.Group();
    NODES.forEach((node) => {
      const mat = new THREE.MeshPhongMaterial({ color: node.c, transparent: true, opacity: 0.92 });
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 1), mat);
      mesh.position.set(node.x, node.y, node.z);
      core.add(mesh);
      meshes.push(mesh);
    });
    scene.add(core);

    const lines = new THREE.Group();
    for (let i = 0; i < NODES.length - 1; i += 1) {
      const start = new THREE.Vector3(NODES[i].x, NODES[i].y, NODES[i].z);
      const end = new THREE.Vector3(NODES[i + 1].x, NODES[i + 1].y, NODES[i + 1].z);
      const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.25 })
      );
      lines.add(line);
    }
    scene.add(lines);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let idleFor = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      idleFor = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      core.rotation.y += dx * 0.005;
      core.rotation.x += dy * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
      idleFor = 0;
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let raf = 0;
    const animate = () => {
      idleFor += 1;
      if (!isDragging && idleFor > 180) {
        core.rotation.y += 0.003;
      }
      lines.rotation.y = core.rotation.y;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      lines.children.forEach((line: THREE.Object3D) => {
        (line as THREE.Line).geometry.dispose();
        ((line as THREE.Line).material as THREE.Material).dispose();
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="w-full h-[50vh] md:h-[70vh] rounded-[18px] border border-border bg-card" aria-hidden />;
}
