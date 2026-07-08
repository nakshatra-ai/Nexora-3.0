import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'button', 'link', 'card', 'text', 'ai'
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  
  // 3D rotation angles
  const rotationOuter = useRef({ x: 0, y: 0, z: 0 });
  const rotationInner = useRef({ x: 0, y: 0, z: 0 });
  
  // Motion history for 3D ghosting/trail
  const historyRef = useRef([]);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const scrollTimeout = useRef(null);

  // Magnetic Snapping
  const magneticElement = useRef(null);
  const magneticBounds = useRef(null);
  
  // Click wave scale
  const clickScale = useRef(1);

  // 1. Device check
  useEffect(() => {
    const checkDevice = () => {
      const isHoverSupported = window.matchMedia('(hover: hover)').matches;
      const isWideScreen = window.innerWidth >= 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const shouldEnable = isHoverSupported && isWideScreen && !isTouchDevice;
      setEnabled(shouldEnable);
      
      if (shouldEnable) {
        document.documentElement.classList.add('has-custom-cursor');
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  // 2. Mouse & Scroll & Hover Hooks
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      clickScale.current = 0.5;
    };

    const handleMouseUp = () => {
      clickScale.current = 1.0;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      scrollVelocity.current = Math.min(15, diff);
      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        scrollVelocity.current = 0;
      }, 100);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isButton = target.closest('button') || target.closest('.btn') || target.closest('[role="button"]');
      const isLink = target.closest('a') || target.closest('.link');
      const isInput = target.closest('input') || target.closest('textarea') || target.closest('select');
      const isCard = target.closest('.panel-card') || target.closest('[class*="bg-card-base"]');
      const isAI = target.closest('.ai-chat') || target.closest('[class*="bg-dark-context"]') || target.closest('.bg-dark-context');
      const isIcon = target.closest('svg') || target.closest('.icon') || target.closest('[class*="react-icons"]');

      if (isAI) {
        setCursorState('ai');
      } else if (isInput) {
        setCursorState('text');
      } else if (isButton) {
        setCursorState('button');
        const btnElement = target.closest('button') || target.closest('.btn');
        if (btnElement) {
          magneticElement.current = btnElement;
          magneticBounds.current = btnElement.getBoundingClientRect();
        }
      } else if (isLink) {
        setCursorState('link');
      } else if (isIcon) {
        setCursorState('button');
      } else if (isCard) {
        setCursorState('card');
      } else {
        setCursorState('default');
        magneticElement.current = null;
        magneticBounds.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseover', handleMouseOver);

    // Canvas sizes Setup
    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // 3. 3D Model Vertices Generators
    // Generates octahedron (8 faces, 6 vertices, 12 edges)
    const getOctahedron = (size) => {
      const vertices = [
        [0, -size, 0],
        [0, size, 0],
        [size, 0, 0],
        [0, 0, size],
        [-size, 0, 0],
        [0, 0, -size]
      ];
      const edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 3], [3, 4], [4, 5], [5, 2]
      ];
      return { vertices, edges };
    };

    // Generates cube (6 faces, 8 vertices, 12 edges)
    const getCube = (size) => {
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size]
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      return { vertices, edges };
    };

    // Generates Icosahedron (20 faces, 12 vertices, 30 edges) for AI Mode
    const getIcosahedron = (size) => {
      const phi = (1 + Math.sqrt(5)) / 2;
      const vertices = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];
      // Scale vertices to match target size
      const factor = size / Math.sqrt(1 + phi * phi);
      const scaledVertices = vertices.map(v => [v[0] * factor, v[1] * factor, v[2] * factor]);
      
      // Calculate edges automatically based on distance threshold
      const edges = [];
      for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
          const dx = scaledVertices[i][0] - scaledVertices[j][0];
          const dy = scaledVertices[i][1] - scaledVertices[j][1];
          const dz = scaledVertices[i][2] - scaledVertices[j][2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < size * 1.2) {
            edges.push([i, j]);
          }
        }
      }
      return { vertices: scaledVertices, edges };
    };

    // 4. 3D Rotation Matrix projection
    const rotate3D = (vertex, rot) => {
      let [x, y, z] = vertex;
      
      // Rotate X
      if (rot.x !== 0) {
        const cos = Math.cos(rot.x);
        const sin = Math.sin(rot.x);
        const ny = y * cos - z * sin;
        const nz = y * sin + z * cos;
        y = ny; z = nz;
      }
      // Rotate Y
      if (rot.y !== 0) {
        const cos = Math.cos(rot.y);
        const sin = Math.sin(rot.y);
        const nx = x * cos + z * sin;
        const nz = -x * sin + z * cos;
        x = nx; z = nz;
      }
      // Rotate Z
      if (rot.z !== 0) {
        const cos = Math.cos(rot.z);
        const sin = Math.sin(rot.z);
        const nx = x * cos - y * sin;
        const ny = x * sin + y * cos;
        x = nx; y = ny;
      }
      
      return [x, y, z];
    };

    // 5. requestAnimationFrame rendering loop
    let animationId = null;
    const tick = () => {
      // Smooth position interpolation (lerp)
      const lerpFactor = 0.15;
      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;

      if (magneticElement.current && magneticBounds.current) {
        const bounds = magneticBounds.current;
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        targetX = centerX + (mouseRef.current.x - centerX) * 0.22;
        targetY = centerY + (mouseRef.current.y - centerY) * 0.22;
      }

      posRef.current.x += (targetX - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetY - posRef.current.y) * lerpFactor;

      // Store history for motion ghosting/trailing lines
      historyRef.current.unshift({ x: posRef.current.x, y: posRef.current.y });
      if (historyRef.current.length > 8) historyRef.current.pop();

      // Dynamic rotation increment based on scroll or mouse move velocity
      const speed = Math.max(1, scrollVelocity.current * 0.05);
      rotationOuter.current.x += 0.015 * speed;
      rotationOuter.current.y += 0.02 * speed;
      rotationInner.current.x -= 0.025 * speed;
      rotationInner.current.y -= 0.01 * speed;

      // Draw 3D elements on canvas
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isLightTheme = document.documentElement.classList.contains('light-theme');
        const primaryColor = isLightTheme ? 'rgba(37, 99, 235, ' : 'rgba(0, 229, 255, '; // Cyan / Blue glow
        const innerColor = isLightTheme ? 'rgba(15, 23, 42, ' : 'rgba(255, 255, 255, '; // White / Slate core
        
        // Define sizes based on cursorState (Scaled down to look extremely compact and elegant)
        let outerSize = 8;
        let innerSize = 3.5;
        
        if (cursorState === 'button') {
          outerSize = 12;
          innerSize = 5;
        } else if (cursorState === 'link') {
          outerSize = 5;
          innerSize = 1.5;
        } else if (cursorState === 'card') {
          outerSize = 14;
          innerSize = 6;
        } else if (cursorState === 'text') {
          outerSize = 4;
          innerSize = 8; // stretch inner cube vertically into a rod
        } else if (cursorState === 'ai') {
          outerSize = 16;
          innerSize = 8;
        }

        // Apply mouse down click compression scaling
        outerSize *= clickScale.current;
        innerSize *= clickScale.current;

        // Draw 3D viewport path trail (Ghosting wireframes)
        historyRef.current.forEach((pos, idx) => {
          if (idx === 0) return; // skip head
          const opacity = (0.25 / idx) * (1 - scrollVelocity.current * 0.02);
          if (opacity <= 0.02) return;

          ctx.strokeStyle = `${primaryColor}${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0; // disable shadow for trail to save GPU fill rate

          const ghostOuter = getOctahedron(outerSize * (1 - idx * 0.08));
          draw3DGeometry(ctx, pos.x, pos.y, ghostOuter, rotationOuter.current, opacity);
        });

        // Setup main outer glow lighting effects
        ctx.shadowColor = isLightTheme ? 'rgba(37, 99, 235, 0.4)' : 'rgba(0, 229, 255, 0.8)';
        ctx.shadowBlur = cursorState === 'ai' ? 18 : 10;
        ctx.lineWidth = cursorState === 'ai' ? 1.5 : 1.0;

        // Get appropriate geometry models based on state
        const outerGeo = cursorState === 'ai' ? getIcosahedron(outerSize) : getOctahedron(outerSize);
        const innerGeo = getCube(innerSize);

        // Draw Outer Rotating Wireframe
        ctx.strokeStyle = `${primaryColor}0.95)`;
        draw3DGeometry(ctx, posRef.current.x, posRef.current.y, outerGeo, rotationOuter.current);

        // Draw Inner Counter-Rotating Core
        ctx.shadowBlur = 4;
        ctx.lineWidth = 0.75;
        ctx.strokeStyle = `${innerColor}0.85)`;
        
        // Stretch inner geometry vertically for text insertion cursor
        if (cursorState === 'text') {
          const stretchedVertices = innerGeo.vertices.map(v => [v[0] * 0.15, v[1] * 1.5, v[2] * 0.15]);
          draw3DGeometry(ctx, posRef.current.x, posRef.current.y, { vertices: stretchedVertices, edges: innerGeo.edges }, rotationInner.current);
        } else {
          draw3DGeometry(ctx, posRef.current.x, posRef.current.y, innerGeo, rotationInner.current);
        }

        // Draw 3D center focal dot
        ctx.fillStyle = isLightTheme ? '#0f172a' : '#ffffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(posRef.current.x, posRef.current.y, 1.0 * clickScale.current, 0, Math.PI * 2);
        ctx.fill();

        // Emits a glowing 3D click pulse ring if clicked
        if (clickScale.current < 1.0) {
          ctx.strokeStyle = `${primaryColor}0.4)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(posRef.current.x, posRef.current.y, outerSize * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    // Helper to rotate, project, and draw 3D edges
    const draw3DGeometry = (context, cx, cy, geometry, rot, forcedOpacity) => {
      const fov = 200; // perspective focal length
      const projected = geometry.vertices.map(v => {
        // Rotate
        const r = rotate3D(v, rot);
        
        // Apply scroll stretch momentum
        if (scrollVelocity.current > 0.5) {
          r[1] += scrollVelocity.current * 0.25; // stretch along Y axis
        }

        // Project
        const scale = fov / (fov + r[2]);
        return [
          cx + r[0] * scale,
          cy + r[1] * scale
        ];
      });

      // Draw Edges
      geometry.edges.forEach(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        context.beginPath();
        context.moveTo(p1[0], p1[1]);
        context.lineTo(p2[0], p2[1]);
        context.stroke();
      });
    };

    tick();

    // Cleanups
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseover', handleMouseOver);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [enabled, cursorState]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-container">
      {/* 3D Viewport wireframe canvas overlay */}
      <canvas ref={canvasRef} className="custom-cursor-canvas" />
    </div>
  );
}
