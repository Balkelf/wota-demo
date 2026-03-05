import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Star, Check} from 'lucide-react';
import {Breadcrumb} from '../components/Breadcrumb';
import {BottomNav} from '../components/BottomNav';

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

// Product tiles - more visual, less text
const products = [
  {
    id: 1,
    name: 'Water Filter Jug',
    price: '£29.99',
    badge: 'Best for Hard Water',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=800&fit=crop',
  },
  {
    id: 2,
    name: 'Under-Sink Filter',
    price: '£89.99',
    badge: 'Best for PFAS',
    image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=600&h=800&fit=crop',
  },
  {
    id: 3,
    name: 'Basic Pitcher',
    price: '£14.99',
    badge: 'Budget Pick',
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&h=800&fit=crop',
  },
];

export const RecommendationScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Header (0-30)
  const headerOpacity = smoothInterpolate(frame, [0, 25], [0, 1]);

  // Phase 2: Product tiles appear staggered (30-120)
  const tileOpacities = [
    smoothInterpolate(frame, [30, 55], [0, 1]),
    smoothInterpolate(frame, [50, 75], [0, 1]),
    smoothInterpolate(frame, [70, 95], [0, 1]),
  ];

  // Phase 3: Selection animation (140-180)
  const selectedTile = frame >= 150 ? 0 : -1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #E0F2FE 0%, ${colors.background} 100%)`,
        padding: 40,
        paddingBottom: 120,
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb items={['Sign in', 'Postcode', 'Results', 'Filters']} />

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          marginBottom: 25,
        }}
      >
        <h1 style={{fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 6}}>
          Recommended Filters
        </h1>
        <p style={{fontSize: 15, color: colors.textMuted, margin: 0}}>
          Based on your water quality
        </p>
      </div>

      {/* Product Tiles - Large, visual-first */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          flex: 1,
        }}
      >
        {products.map((product, i) => {
          const isSelected = selectedTile === i;
          
          return (
            <div
              key={product.id}
              style={{
                background: colors.card,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: isSelected 
                  ? '0 15px 40px rgba(0, 102, 204, 0.2)'
                  : '0 4px 20px rgba(0,0,0,0.06)',
                border: isSelected ? `2px solid ${colors.primaryLight}` : `1px solid ${colors.border}`,
                opacity: tileOpacities[i],
                transform: `scale(${isSelected ? 0.98 : 1})`,
                display: 'flex',
                height: 180,
              }}
            >
              {/* Product Image - 60% of tile */}
              <div
                style={{
                  width: '40%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Badge overlay on image */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: `linear-gradient(135deg, ${colors.success}, #047857)`,
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Star size={12} />
                  {product.badge}
                </div>
              </div>

              {/* Product Info - 40% of tile */}
              <div
                style={{
                  flex: 1,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{marginBottom: 8}}>
                  <div style={{fontSize: 18, fontWeight: 600, color: colors.text}}>
                    {product.name}
                  </div>
                </div>

                <div style={{marginBottom: 12}}>
                  <div style={{fontSize: 28, fontWeight: 700, color: colors.primaryLight}}>
                    {product.price}
                  </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                  {['Reduces contaminants', 'Easy installation'].map((feature, j) => (
                    <div key={j} style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <Check size={14} color={colors.success} />
                      <span style={{fontSize: 12, color: colors.textMuted}}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </AbsoluteFill>
  );
};