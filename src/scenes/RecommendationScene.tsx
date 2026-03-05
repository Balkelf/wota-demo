import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Droplet, Check, Star, ArrowRight} from 'lucide-react';
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

// List of recommended filters
const filters = [
  {
    id: 1,
    name: 'Water Filter Jug',
    price: '£29.99',
    badge: 'Best for Hard Water',
    features: ['Reduces hardness 80%', 'Removes chlorine'],
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Under-Sink Filter',
    price: '£89.99',
    badge: 'Best for PFAS',
    features: ['Removes 99% PFAS', '3-stage filtration'],
    image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Basic Pitcher',
    price: '£14.99',
    badge: 'Budget Pick',
    features: ['Improves taste', 'Affordable'],
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&h=400&fit=crop',
  },
];

export const RecommendationScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Header appears (0-30)
  const headerOpacity = smoothInterpolate(frame, [0, 30], [0, 1]);

  // Phase 2: Filters appear staggered (30-90)
  const filterOpacities = [
    smoothInterpolate(frame, [30, 50], [0, 1]),
    smoothInterpolate(frame, [50, 70], [0, 1]),
    smoothInterpolate(frame, [70, 90], [0, 1]),
  ];

  // Phase 3: Click on first filter (120-180)
  const selectedFilter = frame >= 130 ? 0 : -1;
  const cardPressed = frame >= 150 && frame < 170;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #E0F2FE 0%, ${colors.background} 100%)`,
        padding: 50,
        paddingBottom: 140,
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb items={['Sign in', 'Postcode', 'Results', 'Product']} />

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          marginBottom: 30,
        }}
      >
        <h1 style={{fontSize: 36, fontWeight: 700, color: colors.text, marginBottom: 8}}>
          Recommended for You
        </h1>
        <p style={{fontSize: 18, color: colors.textMuted}}>
          Based on your water quality analysis
        </p>
      </div>

      {/* Filter list */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {filters.map((filter, i) => {
          const isSelected = selectedFilter === i;
          
          return (
            <div
              key={filter.id}
              style={{
                background: colors.card,
                borderRadius: 20,
                padding: 20,
                display: 'flex',
                gap: 20,
                boxShadow: isSelected 
                  ? '0 10px 30px rgba(0, 102, 204, 0.15)'
                  : '0 4px 15px rgba(0,0,0,0.05)',
                border: isSelected ? `2px solid ${colors.primaryLight}` : `1px solid ${colors.border}`,
                opacity: filterOpacities[i],
                transform: `scale(${isSelected && cardPressed ? 0.98 : 1})`,
              }}
            >
              {/* Product image */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 14,
                  background: `linear-gradient(180deg, #F5F5F5, #E8E8E8)`,
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={filter.image}
                  alt={filter.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Product info */}
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {/* Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: `${colors.success}15`,
                    padding: '6px 12px',
                    borderRadius: 8,
                    width: 'fit-content',
                    marginBottom: 8,
                  }}
                >
                  <Star size={14} color={colors.success} />
                  <span style={{fontSize: 12, fontWeight: 600, color: colors.success}}>
                    {filter.badge}
                  </span>
                </div>

                {/* Name and price */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8}}>
                  <div style={{fontSize: 22, fontWeight: 600, color: colors.text}}>
                    {filter.name}
                  </div>
                  <div style={{fontSize: 24, fontWeight: 700, color: colors.primaryLight}}>
                    {filter.price}
                  </div>
                </div>

                {/* Features */}
                <div style={{display: 'flex', gap: 16}}>
                  {filter.features.map((feature, j) => (
                    <div key={j} style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <Check size={14} color={colors.success} />
                      <span style={{fontSize: 13, color: colors.textMuted}}>{feature}</span>
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