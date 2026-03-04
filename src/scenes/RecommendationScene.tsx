import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Droplets, Check, Star, ArrowRight, Filter, Heart, Shield} from 'lucide-react';

// WCAG AAA compliant colors
const colors = {
  primary: '#0077B6',
  secondary: '#0096C7',
  accent: '#00B4D8',
  warning: '#B45309',
  success: '#047857',
  background: '#F0F9FF',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  glass: 'rgba(255, 255, 255, 0.92)',
};

// Premium easing
const easeOutPremium = (t: number) => 1 - Math.pow(1 - t, 4);

const smoothInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[]
) => {
  const progress = interpolate(frame, inputRange, [0, 1]);
  return interpolate(easeOutPremium(progress), [0, 1], outputRange);
};

export const RecommendationScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Card entrance
  const cardScale = smoothInterpolate(frame, [0, 25], [0.92, 1]);
  const cardOpacity = smoothInterpolate(frame, [0, 20], [0, 1]);

  // Header slide
  const headerY = smoothInterpolate(frame, [0, 20], [-15, 0]);

  // Badge glow
  const badgeGlow = 0.6 + Math.sin(frame * 0.06) * 0.15;

  // Features stagger
  const feature1Opacity = smoothInterpolate(frame, [20, 35], [0, 1]);
  const feature2Opacity = smoothInterpolate(frame, [28, 43], [0, 1]);
  const feature3Opacity = smoothInterpolate(frame, [36, 51], [0, 1]);

  // CTA entrance
  const ctaOpacity = smoothInterpolate(frame, [45, 65], [0, 1]);
  const ctaScale = smoothInterpolate(frame, [45, 65], [0.95, 1]);

  // Button glow pulse
  const glowPulse = 0.35 + Math.sin(frame * 0.07) * 0.15;

  // Trust footer
  const trustOpacity = smoothInterpolate(frame, [70, 85], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #E0F2FE 0%, ${colors.background} 100%)`,
        padding: 45,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 35,
        }}
      >
        <div style={{fontSize: 34, fontWeight: 600, color: colors.text}}>
          Recommended for You
        </div>
        <div style={{fontSize: 20, color: colors.textMuted, marginTop: 6}}>
          Based on your water quality
        </div>
      </div>

      {/* Product card with premium design */}
      <div
        style={{
          background: colors.card,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: `
            0 20px 50px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.02)
          `,
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        {/* Product image area */}
        <div
          style={{
            height: 320,
            background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}12)`,
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
              width: 350,
              height: 350,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.primary}12 0%, transparent 70%)`,
              top: -80,
              right: -80,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.accent}12 0%, transparent 70%)`,
              bottom: -40,
              left: -40,
            }}
          />
          
          {/* Product icon */}
          <div
            style={{
              width: 180,
              height: 180,
              background: 'white',
              borderRadius: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 50px rgba(0,0,0,0.12)',
              zIndex: 1,
            }}
          >
            <Filter size={90} color={colors.primary} strokeWidth={1.5} />
          </div>

          {/* Best badge */}
          <div
            style={{
              position: 'absolute',
              top: 22,
              left: 22,
              background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
              color: 'white',
              padding: '10px 20px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 600,
              boxShadow: `0 4px 15px rgba(4, 120, 87, ${badgeGlow})`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Star size={16} color="white" fill="white" />
            Best for Hard Water
          </div>
        </div>

        {/* Content */}
        <div style={{padding: 36}}>
          {/* Title and price */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22}}>
            <div>
              <div style={{fontSize: 34, fontWeight: 700, color: colors.text, letterSpacing: '-0.5px'}}>
                Water Filter Jug
              </div>
              <div style={{fontSize: 18, color: colors.textMuted, marginTop: 4}}>
                Premium filtration system
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: 42, fontWeight: 700, color: colors.primary}}>
                £29.99
              </div>
              <div style={{fontSize: 15, color: colors.textMuted, textDecoration: 'line-through'}}>
                £39.99
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: feature1Opacity,
                transform: `translateX(${(1 - feature1Opacity) * 15}px)`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={16} color="white" strokeWidth={3} />
              </div>
              <span style={{fontSize: 20, color: colors.text}}>Reduces hardness by 80%</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: feature2Opacity,
                transform: `translateX(${(1 - feature2Opacity) * 15}px)`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={16} color="white" strokeWidth={3} />
              </div>
              <span style={{fontSize: 20, color: colors.text}}>Removes chlorine taste</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: feature3Opacity,
                transform: `translateX(${(1 - feature3Opacity) * 15}px)`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={16} color="white" strokeWidth={3} />
              </div>
              <span style={{fontSize: 20, color: colors.text}}>BPA-free, easy to use</span>
            </div>
          </div>

          {/* CTA Button with glow effect */}
          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${ctaScale})`,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                padding: '26px 44px',
                borderRadius: 18,
                fontSize: 26,
                fontWeight: 600,
                textAlign: 'center',
                boxShadow: `
                  0 12px 35px rgba(0, 119, 182, ${glowPulse}),
                  inset 0 1px 0 rgba(255,255,255,0.25)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              Get it Now
              <ArrowRight size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Trust footer */}
      <div
        style={{
          marginTop: 25,
          textAlign: 'center',
          opacity: trustOpacity,
        }}
      >
        <div style={{fontSize: 16, color: colors.textMuted, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6}}>
          <Droplets size={16} color={colors.primary} />
          100% independent recommendations
        </div>
        <div style={{fontSize: 14, color: colors.textMuted, opacity: 0.7}}>
          Affiliate links support us at no extra cost
        </div>
      </div>
    </AbsoluteFill>
  );
};