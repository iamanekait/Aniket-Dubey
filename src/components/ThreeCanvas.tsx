import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, ShieldCheck, Compass } from 'lucide-react';

interface ThreeCanvasProps {
  className?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera with responsive FOV
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = width < 480 ? 7.2 : 6;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL initialization failed, rendering fallback:', err);
      setWebGLSupported(false);
      return;
    }

    // Group to hold all 3D strategic elements
    const strategicGroup = new THREE.Group();
    scene.add(strategicGroup);

    // 1. Central Icosahedron (Core Business Nucleus - Lustrous Obsidian Bronze)
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c170d, // Lustrous obsidian bronze
      roughness: 0.18,
      metalness: 0.92,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    strategicGroup.add(coreMesh);

    // 2. Outer Wireframe Cage (Strategic Execution Shell - Gilded 24K Gold)
    const wireGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Burnished Champagne Gold
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    strategicGroup.add(wireMesh);

    // 3. Orbital Rings (Business & IT Synergy Rings - Platinum & Gold)
    const ringGeometry1 = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xf5e5be, // Liquid Champagne
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ringMesh1.rotation.x = Math.PI / 3;
    strategicGroup.add(ringMesh1);

    const ringGeometry2 = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xc5a059, // Classic Bronze Gold
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.y = Math.PI / 4;
    strategicGroup.add(ringMesh2);

    // 4. Strategic Nodes (Pillars of growth - Glowing Amber Gold)
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xfde68a });
    const nodes: THREE.Mesh[] = [];

    const positions = [
      [1.8, 0.8, 0.5],
      [-1.7, -0.6, 0.8],
      [0.4, 1.9, -0.7],
      [-0.8, -1.8, -0.5],
      [1.2, -1.4, 1.1],
      [-1.3, 1.5, 0.9],
    ];

    positions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      strategicGroup.add(node);
      nodes.push(node);
    });

    // Lighting with warm luxury illumination
    const ambientLight = new THREE.AmbientLight(0xfffaed, 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf59e0b, 3.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd4af37, 2.5, 50);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Pointer & Touch interaction tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.6;
    };

    // Touch interaction for mobile/tablet devices
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.004;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Scroll interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause rendering when off-screen (saves battery & GPU on mobile)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render if off-screen to preserve device battery and CPU
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse/touch interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      // Base autonomous rotation + scroll interaction
      strategicGroup.rotation.y = elapsedTime * 0.22 + currentRotationY + scrollY * 0.0008;
      strategicGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.12 + currentRotationX;

      // Pulse outer wireframe slightly
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      wireMesh.scale.set(pulse, pulse, pulse);

      // Rotate orbit rings at complementary angles
      ringMesh1.rotation.z = elapsedTime * 0.3;
      ringMesh2.rotation.z = -elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling using ResizeObserver + fallback
    const updateSize = (newWidth: number, newHeight: number) => {
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.position.z = newWidth < 480 ? 7.2 : 6;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateSize(entry.contentRect.width, entry.contentRect.height);
      }
    });
    resizeObserver.observe(container);

    const handleWindowResize = () => {
      if (container) {
        updateSize(container.clientWidth, container.clientHeight);
      }
    };
    window.addEventListener('resize', handleWindowResize, { passive: true });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowResize);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();

      if (container && renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringGeometry1.dispose();
      ringMaterial1.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      renderer?.dispose();
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div
        className={`relative w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 bg-[#0E1017]/80 border border-amber-500/25 rounded-2xl text-center shadow-xl ${className}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-4 animate-pulse">
          <Layers className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-white mb-1">Interactive Strategic Architecture</h4>
        <p className="text-xs text-slate-400 max-w-xs">
          Tri-pillar alignment uniting Business Strategy, Content Marketing Authority, and Managed IT Infrastructure.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none [touch-action:pan-y] ${className}`}
      id="threejs-strategic-canvas"
      aria-label="3D Interactive Business & Technology Strategic Model"
    />
  );
};
