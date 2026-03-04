import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, random} from 'remotion';

// Premium color palette inspired by award-winning apps
const colors = {
  primary: '#0EA5E9',      // Sky blue - water, trust
  secondary: '#06B6D4',    // Cyan - freshness
  accent: '#14B8A6',       // Teal - health
  warning: '#F59E0B',      // Amber - attention
  background: '#F0F9FF',   // Very light blue
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  glass: 'rgba(255, 255, 255, 0.7)',
};

// Particle system for ambient motion
const WaterParticles: React.FC<{seed: number}> = ({seed}) => {
  const frame = useCurrentFrame();
  const particles = [];
  
  for (let i = 0; i < 15; i++) {
    const startX = random(`x-${seed}-${i}`) * 1080;
    const startY = random(`y-${seed}-${i}`) * 1920;
    const size = random(`s-${seed}-${i}`) * 20 + 5;
    const speed = random(`v-${seed}-${i}`) * 0.5 + 0.3;
    const opacity = random(`o-${seed}-${i}`) * 0.3 + 0.1;
    
    const x = startX + Math.sin(frame * 0.02 * speed + i) * 50;
    const y = (startY + frame * speed * 2) % 2200 - 200;
    
    particles.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(14, 165, 233, ${opacity}) 0%, transparent 70%)`,
          filter: 'blur(2px)',
        }}
      />
    );
  }
  
  return <>{particles}</>;
};

export const LandingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  // Logo bounce with overshoot
  const logoSpring = spring({
    frame,
    fps,
    config: {damping: 12, stiffness: 200, mass: 0.8},
  });

  // Text reveal with stagger
  const textReveal = spring({
    frame: frame - 20,
    fps,
    config: {damping: 15, stiffness: 100},
  });

  // Input slide with spring
  const inputSpring = spring({
    frame: frame - 40,
    fps,
    config: {damping: 20, stiffness: 120},
  });

  // Pulse effect for CTA
  const pulse = Math.sin(frame * 0.1) * 0.02 + 1;

  // Ripple animation
  const ripple1Scale = interpolate(frame, [0, 90], [0, 3], {
    extrapolateRight: 'clamp',
  });
  const ripple1Opacity = interpolate(frame, [0, 60, 90], [0.5, 0.2, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient overlay */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.02) * 20}% ${50 + Math.cos(frame * 0.02) * 20}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Water particles */}
      <WaterParticles seed={1} />

      {/* Ripple effects */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: '50%',
          border: `3px solid rgba(255,255,255,${ripple1Opacity})`,
          transform: `scale(${ripple1Scale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: '50%',
          border: `3px solid rgba(255,255,255,${ripple1Opacity * 0.6})`,
          transform: `scale(${ripple1Scale * 0.8})`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 60,
        }}
      >
        {/* Logo with water droplet animation */}
        <div
          style={{
            transform: `scale(${logoSpring})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Droplet icon with inner glow */}
          <div
            style={{
              width: 180,
              height: 180,
              marginBottom: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              borderRadius: '50%',
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.2),
                inset 0 -20px 40px rgba(255,255,255,0.2),
                inset 0 20px 40px rgba(255,255,255,0.3)
              `,
            }}
          >
            <div style={{fontSize: 100, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'}}>
              💧
            </div>
          </div>

          {/* App name with premium typography */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-2px',
              textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            Wota
          </div>
        </div>

        {/* Tagline with reveal */}
        <div
          style={{
            marginTop: 40,
            fontSize: 44,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            opacity: textReveal,
            transform: `translateY(${(1 - textReveal) * 30}px)`,
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          What's really in your tap water?
        </div>

        {/* Postcode input with glassmorphism */}
        <div
          style={{
            marginTop: 80,
            opacity: inputSpring,
            transform: `translateY(${(1 - inputSpring) * 40}px)`,
          }}
        >
          <div
            style={{
              width: 700,
              height: 100,
              background: colors.glass,
              backdropFilter: 'blur(20px)',
              borderRadius: 30,
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 40px',
              boxShadow: `
                0 10px 40px rgba(0,0,0,0.1),
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
              transform: `scale(${pulse})`,
            }}
          >
            <div
              style={{
                fontSize: 36,
                color: 'rgba(255,255,255,0.7)',
                flex: 1,
              }}
            >
              Enter your postcode
            </div>
            {/* Animated cursor */}
            <div
              style={{
                width: 3,
                height: 40,
                backgroundColor: 'white',
                opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
              }}
            />
          </div>
        </div>

        {/* Trust signals */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            display: 'flex',
            gap: 40,
            opacity: textReveal,
          }}
        >
          {['Based on official data', 'No signup required', '100% independent'].map((text, i) => (
            <div
              key={i}
              style={{
                fontSize: 22,
                color: 'rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{opacity: 0.9}}>✓</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
