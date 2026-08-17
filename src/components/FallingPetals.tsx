import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  flip: number;
  flipSpeed: number;
  colorType: 'deep-red' | 'soft-rose' | 'muted-crimson' | 'gold-petal';
}

interface FallingPetalsProps {
  className?: string;
  petalCount?: number;
  showGoldShimmer?: boolean;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({
  className = '',
  petalCount = 35,
  showGoldShimmer = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || document.documentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || document.documentElement.clientWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = {
      'deep-red': 'rgba(155, 48, 57, ',
      'soft-rose': 'rgba(189, 78, 88, ',
      'muted-crimson': 'rgba(130, 36, 45, ',
      'gold-petal': 'rgba(214, 185, 138, ',
    };

    // Initialize petals
    const petals: Petal[] = [];
    const types: Petal['colorType'][] = [
      'deep-red',
      'soft-rose',
      'muted-crimson',
      'soft-rose',
      'deep-red',
      'gold-petal',
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 7, // 7px to 15px
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.45 + 0.35,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        colorType: types[Math.floor(Math.random() * types.length)],
      });
    }

    // Shimmer particles for muted gold ambiance
    interface GoldParticle {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const goldParticles: GoldParticle[] = [];
    if (showGoldShimmer) {
      for (let i = 0; i < 24; i++) {
        goldParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          speedY: Math.random() * 0.3 + 0.1,
          twinkleSpeed: Math.random() * 0.04 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(1, Math.cos(p.flip));

      ctx.beginPath();
      // Draw organic curve petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 1.1, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.5, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
      ctx.closePath();

      const colorPrefix = colors[p.colorType];
      ctx.fillStyle = `${colorPrefix}${p.opacity})`;
      ctx.fill();

      // Delicate subtle petal vein / highlight
      ctx.strokeStyle = p.colorType === 'gold-petal' 
        ? `rgba(245, 230, 200, ${p.opacity * 0.6})`
        : `rgba(220, 140, 148, ${p.opacity * 0.4})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.01;

      // Draw gold shimmer particles
      if (showGoldShimmer) {
        goldParticles.forEach((gp) => {
          gp.y -= gp.speedY;
          if (gp.y < 0) {
            gp.y = height;
            gp.x = Math.random() * width;
          }
          gp.twinklePhase += gp.twinkleSpeed;
          const currentAlpha = Math.max(0.1, Math.sin(gp.twinklePhase) * 0.3 + gp.alpha);

          ctx.beginPath();
          ctx.arc(gp.x, gp.y, gp.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 196, 150, ${currentAlpha})`;
          ctx.shadowColor = '#D4BC96';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // Draw and update falling petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(step + p.size) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [petalCount, showGoldShimmer]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full max-w-full block overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};
