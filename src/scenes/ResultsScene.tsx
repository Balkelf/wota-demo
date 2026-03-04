import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Droplet, Shield, AlertTriangle, CheckCircle, ChevronRight} from 'lucide-react';

const colors = {
  primary: '#0A2540',
  primaryLight: '#0066CC',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  border: '#E2E8F0',
  success: '#0D7A3E',
  warning: '#B45309',
  danger: '#B91C1C',
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

// Real UK water quality data
const waterData = [
  {
    name: 'Hardness',
    value: '280 mg/l',
    status: 'warning',
    icon: Droplet,
    explanation: 'Very hard water. Can cause limescale buildup and dry skin.',
  },
  {
    name: 'Chlorine',
    value: '0.5 mg/l',
    status: 'good',
    icon: Shield,
    explanation: 'Normal levels. Safe for drinking.',
  },
  {
    name: 'pH Level',
    value: '7.8',
    status: 'good',
    icon: Droplet,
    explanation: 'Neutral. Ideal for drinking water.',
  },
  {
    name: 'PFAS',
    value: '12 ng/l',
    status: 'warning',
    icon: AlertTriangle,
    explanation: 'Detected. Long-term exposure may have health effects.',
  },
];

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene timing (480-720 frames = 16-24 seconds, relative 0-240)
  const localFrame = frame - 480;

  // Phase 1: Results appear (0-30)
  const headerOpacity = smoothInterpolate(localFrame, [0, 30], [0, 1]);
  const headerY = smoothInterpolate(localFrame, [0, 30], [-20, 0]);

  // Phase 2-4: Each parameter reveals (30-180, staggered)
  const param1Opacity = smoothInterpolate(localFrame, [30, 60], [0, 1]);
  const param2Opacity = smoothInterpolate(localFrame, [60, 90], [0, 1]);
  const param3Opacity = smoothInterpolate(localFrame, [90, 120], [0, 1]);
  const param4Opacity = smoothInterpolate(localFrame, [120, 150], [0, 1]);

  // Phase 5: User reads (150-200)
  // Phase 6: Click recommendation (200-240)
  const cardPressed = localFrame >= 210;

  const paramOpacities = [param1Opacity, param2Opacity, param3Opacity, param4Opacity];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        padding: 50,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: 48, fontWeight: 700, color: colors.text, marginBottom: 8}}>
              SW1A 1AA
            </div>
            <div style={{fontSize: 24, color: colors.textMuted}}>
              Thames Water • Westminster, London
            </div>
          </div>
          <div
            style={{
              padding: '16px 24px',
              background: '#FEF3C7',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <AlertTriangle size={24} color={colors.warning} />
            <span style={{fontSize: 18, fontWeight: 600, color: colors.warning}}>2 concerns</span>
          </div>
        </div>
      </div>

      {/* Water quality card */}
      <div
        style={{
          background: colors.card,
          borderRadius: 24,
          padding: 40,
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          opacity: headerOpacity,
        }}
      >
        <h2 style={{fontSize: 28, fontWeight: 600, color: colors.text, marginBottom: 30}}>
          Your Water Quality
        </h2>

        {/* Parameters */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          {waterData.map((param, i) => {
            const Icon = param.icon;
            const statusColor = param.status === 'good' ? colors.success : 
                              param.status === 'warning' ? colors.warning : colors.danger;
            
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  padding: 24,
                  background: '#FAFAFA',
                  borderRadius: 16,
                  opacity: paramOpacities[i],
                  transform: `translateX(${(1 - paramOpacities[i]) * -20}px)`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: `${statusColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={28} color={statusColor} />
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                    <span style={{fontSize: 22, fontWeight: 600, color: colors.text}}>{param.name}</span>
                    <span style={{fontSize: 22, fontWeight: 700, color: colors.text}}>{param.value}</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    {param.status === 'good' ? (
                      <CheckCircle size={16} color={colors.success} />
                    ) : (
                      <AlertTriangle size={16} color={colors.warning} />
                    )}
                    <span style={{fontSize: 16, color: statusColor, fontWeight: 500}}>
                      {param.status === 'good' ? 'Normal' : 'Attention needed'}
                    </span>
                  </div>
                  <p style={{fontSize: 16, color: colors.textMuted, lineHeight: 1.5, margin: 0}}>
                    {param.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation CTA */}
      <div
        style={{
          marginTop: 30,
          opacity: param4Opacity,
        }}
      >
        <div
          style={{
            background: colors.card,
            borderRadius: 20,
            padding: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transform: `scale(${cardPressed ? 0.98 : 1})`,
          }}
        >
          <div>
            <div style={{fontSize: 20, fontWeight: 600, color: colors.text, marginBottom: 4}}>
              View Recommended Filters
            </div>
            <div style={{fontSize: 16, color: colors.textMuted}}>
              Based on your water quality
            </div>
          </div>
          <ChevronRight size={28} color={colors.primaryLight} />
        </div>
      </div>
    </AbsoluteFill>
  );
};