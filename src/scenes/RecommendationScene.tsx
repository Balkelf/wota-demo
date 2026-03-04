import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const colors = {
  primary: '#0EA5E9',
  secondary: '#06B6D4',
  accent: '#14B8A6',
  warning: '#F59E0B',
  success: '#10B981',
  background: '#F0F9FF',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  glass: 'rgba(255, 255, 255, 0.9)',
};

export const RecommendationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Card entrance
  const cardSpring = spring({
    frame,
    fps,
    config: {damping: 25, stiffness: 120},
  });

  // Features stagger
  const feature1 = spring({
    frame: frame - 20,
    fps,
    config: {damping: 20, stiffness: 100},
  });
  const feature2 = spring({
    frame: frame - 30,
    fps,
    config: {damping: 20, stiffness: 100},
  });
  const feature3 = spring({
    frame: frame - 40,
    fps,
    config: {damping: 20, stiffness: 100},
  });

  // Button glow
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  // CTA scale
  const ctaScale = spring({
    frame: frame - 50,
    fps,
    config: {damping: 15, stiffness: 200},
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #E0F2FE 0%, ${colors.background} 100%)`,
        padding: 50,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: cardSpring,
          transform: `translateY(${(1 - cardSpring) * -20}px)`,
          marginBottom: 40,
        }}
      >
        <div style={{fontSize: 36, fontWeight: 600, color: colors.text}}>
          Recommended for You
        </div>
        <div style={{fontSize: 22, color: colors.textMuted, marginTop: 8}}>
          Based on your water quality
        </div>
      </div>

      {/* Product card with premium design */}
      <div
        style={{
          background: colors.card,
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: `
            0 25px 60px rgba(0,0,0,0.1),
            0 0 0 1px rgba(0,0,0,0.03)
          `,
          opacity: cardSpring,
          transform: `scale(${0.92 + cardSpring * 0.08})`,
        }}
      >
        {/* Product image area */}
        <div
          style={{
            height: 350,
            background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}20)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
              top: -100,
              right: -100,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
              bottom: -50,
              left: -50,
            }}
          />
          
          {/* Product icon */}
          <div
            style={{
              width: 200,
              height: 200,
              background: 'white',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              zIndex: 1,
            }}
          >
            <span style={{fontSize: 100}}>🫗</span>
          </div>

          {/* Best badge */}
          <div
            style={{
              position: 'absolute',
              top: 25,
              left: 25,
              background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
              color: 'white',
              padding: '12px 24px',
              borderRadius: 15,
              fontSize: 18,
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            }}
          >
            ⭐ Best for Hard Water
          </div>
        </div>

        {/* Content */}
        <div style={{padding: 40}}>
          {/* Title and price */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25}}>
            <div>
              <div style={{fontSize: 38, fontWeight: 700, color: colors.text, letterSpacing: '-0.5px'}}>
                Water Filter Jug
              </div>
              <div style={{fontSize: 20, color: colors.textMuted, marginTop: 5}}>
                Premium filtration system
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: 48, fontWeight: 700, color: colors.primary}}>
                £29.99
              </div>
              <div style={{fontSize: 16, color: colors.textMuted, textDecoration: 'line-through'}}>
                £39.99
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 35}}>
            {[
              {text: 'Reduces hardness by 80%', opacity: feature1},
              {text: 'Removes chlorine taste', opacity: feature2},
              {text: 'BPA-free, easy to use', opacity: feature3},
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  opacity: feature.opacity,
                  transform: `translateX(${(1 - feature.opacity) * 20}px)`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  ✓
                </div>
                <span style={{fontSize: 22, color: colors.text}}>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button with glow effect */}
          <div
            style={{
              opacity: ctaScale,
              transform: `scale(${ctaScale})`,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                padding: '30px 50px',
                borderRadius: 20,
                fontSize: 28,
                fontWeight: 600,
                textAlign: 'center',
                boxShadow: `
                  0 15px 40px rgba(14, 165, 233, ${glowPulse * 0.4}),
                  inset 0 1px 0 rgba(255,255,255,0.3)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
              }}
            >
              Get it Now
              <span style={{fontSize: 24}}>→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust footer */}
      <div
        style={{
          marginTop: 30,
          textAlign: 'center',
          opacity: ctaScale,
        }}
      >
        <div style={{fontSize: 18, color: colors.textMuted, marginBottom: 10}}>
          💧 100% independent recommendations
        </div>
        <div style={{fontSize: 16, color: colors.textMuted, opacity: 0.7}}>
          Affiliate links support us at no extra cost
        </div>
      </div>
    </AbsoluteFill>
  );
};
