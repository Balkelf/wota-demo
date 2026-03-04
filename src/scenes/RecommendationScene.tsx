import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Droplet, Check, Star, ArrowRight} from 'lucide-react';

const colors = {
  primary: '#0A2540',
  primaryLight: '#0066CC',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  border: '#E2E8F0',
  success: '#0D7A3E',
};

const easeOutPremium = (t: number) => 1 - Math.pow(1 - t, 4);

const smoothInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[]
) => {
  const progress = interpolate(frame, inputRange, [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return interpolate(easeOutPremium(progress), [0, 1], outputRange);
};

const features = [
  'Reduces hardness by 80%',
  'Removes chlorine taste',
  'BPA-free, easy to use',
];

export const RecommendationScene: React.FC = () => {
  const frame = useCurrentFrame(); // Already shifted by Sequence - starts at 0

  // Phase 1: Product appears (0-30)
  const cardOpacity = smoothInterpolate(frame, [0, 30], [0, 1]);
  const cardScale = smoothInterpolate(frame, [0, 30], [0.95, 1]);

  // Phase 2: Image area (30-60)
  const imageOpacity = smoothInterpolate(frame, [30, 60], [0, 1]);

  // Phase 3: Details appear (60-120)
  const detailsOpacity = smoothInterpolate(frame, [60, 90], [0, 1]);
  const featuresOpacity = smoothInterpolate(frame, [90, 120], [0, 1]);

  // Phase 4: CTA highlight (120-180)
  const ctaOpacity = smoothInterpolate(frame, [120, 150], [0, 1]);
  const ctaGlow = 0.8 + Math.sin(frame * 0.1) * 0.2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #E0F2FE 0%, ${colors.background} 100%)`,
        padding: 50,
      }}
    >
      {/* Product card */}
      <div
        style={{
          background: colors.card,
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        {/* Large product image area */}
        <div
          style={{
            height: 450,
            background: `linear-gradient(135deg, ${colors.primaryLight}08, #00B4D815)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            opacity: imageOpacity,
          }}
        >
          {/* Product image placeholder - large */}
          <div
            style={{
              width: 280,
              height: 320,
              background: `linear-gradient(180deg, #F5F5F5, #E8E8E8)`,
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Droplet size={120} color={colors.primaryLight} style={{opacity: 0.5}} />
          </div>

          {/* Best for badge */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              background: `linear-gradient(135deg, ${colors.success}, #047857)`,
              color: 'white',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(13, 122, 62, 0.3)',
            }}
          >
            <Star size={18} />
            Best for Hard Water
          </div>
        </div>

        {/* Product details */}
        <div
          style={{
            padding: 40,
            opacity: detailsOpacity,
          }}
        >
          {/* Title and price */}
          <div style={{marginBottom: 30}}>
            <h2 style={{fontSize: 36, fontWeight: 700, color: colors.text, marginBottom: 8, margin: 0}}>
              Water Filter Jug
            </h2>
            <p style={{fontSize: 18, color: colors.textMuted, marginTop: 8}}>
              Premium filtration system
            </p>
          </div>

          {/* Price */}
          <div style={{marginBottom: 30}}>
            <div style={{fontSize: 48, fontWeight: 700, color: colors.primaryLight}}>
              £29.99
            </div>
            <div style={{fontSize: 16, color: colors.textMuted, textDecoration: 'line-through'}}>
              £39.99
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              marginBottom: 35,
              opacity: featuresOpacity,
            }}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${colors.success}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={16} color={colors.success} />
                </div>
                <span style={{fontSize: 20, color: colors.text}}>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            style={{
              opacity: ctaOpacity,
            }}
          >
            <button
              style={{
                width: '100%',
                padding: '26px',
                background: `linear-gradient(135deg, ${colors.primaryLight}, #00B4D8)`,
                border: 'none',
                borderRadius: 16,
                color: 'white',
                fontSize: 22,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                cursor: 'pointer',
                boxShadow: `0 ${Math.round(15 * ctaGlow)}px 40px rgba(0, 102, 204, ${0.3 * ctaGlow})`,
              }}
            >
              Get it Now
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Trust note */}
      <div
        style={{
          marginTop: 30,
          textAlign: 'center',
          opacity: detailsOpacity,
        }}
      >
        <p style={{fontSize: 16, color: colors.textMuted, margin: 0}}>
          100% independent recommendations • Affiliate links support us at no extra cost
        </p>
      </div>
    </AbsoluteFill>
  );
};