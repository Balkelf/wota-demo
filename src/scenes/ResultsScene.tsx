import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Droplet, Shield, AlertTriangle, CheckCircle, ChevronRight, Info} from 'lucide-react';
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

// Water data with good/bad ranges for visual explanation
const waterData = [
  {
    name: 'Hardness',
    value: 280,
    unit: 'mg/l',
    status: 'warning',
    icon: Droplet,
    explanation: 'Very hard water',
    goodRange: '0-120 mg/l',
    yourValue: '280 mg/l',
    barPosition: 70, // % position on bar
  },
  {
    name: 'Chlorine',
    value: 0.5,
    unit: 'mg/l',
    status: 'good',
    icon: Shield,
    explanation: 'Normal levels',
    goodRange: '0-1 mg/l',
    yourValue: '0.5 mg/l',
    barPosition: 50,
  },
  {
    name: 'pH Level',
    value: 7.8,
    unit: '',
    status: 'good',
    icon: Droplet,
    explanation: 'Neutral - Ideal',
    goodRange: '6.5-8.5',
    yourValue: '7.8',
    barPosition: 55,
  },
  {
    name: 'PFAS',
    value: 12,
    unit: 'ng/l',
    status: 'warning',
    icon: AlertTriangle,
    explanation: 'Above recommended',
    goodRange: '0-4 ng/l',
    yourValue: '12 ng/l',
    barPosition: 80,
  },
];

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Results appear (0-30)
  const headerOpacity = smoothInterpolate(frame, [0, 30], [0, 1]);
  const headerY = smoothInterpolate(frame, [0, 30], [-20, 0]);

  // Phase 2-4: Each parameter reveals (30-180, staggered)
  const paramOpacities = [
    smoothInterpolate(frame, [30, 60], [0, 1]),
    smoothInterpolate(frame, [60, 90], [0, 1]),
    smoothInterpolate(frame, [90, 120], [0, 1]),
    smoothInterpolate(frame, [120, 150], [0, 1]),
  ];

  // Phase 6: Click recommendation (200-240)
  const cardPressed = frame >= 210;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        padding: 50,
        paddingBottom: 140,
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb items={['Sign in', 'Postcode', 'Results']} />

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 30,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: 44, fontWeight: 700, color: colors.text, marginBottom: 8}}>
              SW1A 1AA
            </div>
            <div style={{fontSize: 22, color: colors.textMuted}}>
              Thames Water • Westminster, London
            </div>
          </div>
          <div
            style={{
              padding: '14px 22px',
              background: '#FEF3C7',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <AlertTriangle size={22} color={colors.warning} />
            <span style={{fontSize: 16, fontWeight: 600, color: colors.warning}}>2 concerns</span>
          </div>
        </div>
      </div>

      {/* Water quality card */}
      <div
        style={{
          background: colors.card,
          borderRadius: 24,
          padding: 35,
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          opacity: headerOpacity,
        }}
      >
        <h2 style={{fontSize: 26, fontWeight: 600, color: colors.text, marginBottom: 25}}>
          Your Water Quality
        </h2>

        {/* Parameters with visual bars */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {waterData.map((param, i) => {
            const Icon = param.icon;
            const statusColor = param.status === 'good' ? colors.success : 
                              param.status === 'warning' ? colors.warning : colors.danger;
            
            return (
              <div
                key={i}
                style={{
                  padding: 20,
                  background: '#FAFAFA',
                  borderRadius: 14,
                  opacity: paramOpacities[i],
                  transform: `translateX(${(1 - paramOpacities[i]) * -20}px)`,
                }}
              >
                {/* Header row */}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${statusColor}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={24} color={statusColor} />
                    </div>
                    <div>
                      <span style={{fontSize: 20, fontWeight: 600, color: colors.text}}>{param.name}</span>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 2}}>
                        {param.status === 'good' ? (
                          <CheckCircle size={14} color={colors.success} />
                        ) : (
                          <AlertTriangle size={14} color={colors.warning} />
                        )}
                        <span style={{fontSize: 14, color: statusColor, fontWeight: 500}}>
                          {param.explanation}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span style={{fontSize: 22, fontWeight: 700, color: colors.text}}>{param.yourValue}</span>
                </div>

                {/* Visual bar showing good range vs your value */}
                <div style={{marginTop: 10}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                    <span style={{fontSize: 12, color: colors.textMuted}}>Good range: {param.goodRange}</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: '#E2E8F0',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Good range indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '40%',
                        background: `${colors.success}30`,
                        borderRadius: 4,
                      }}
                    />
                    {/* Your value marker */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${param.barPosition}%`,
                        top: -4,
                        width: 16,
                        height: 16,
                        background: statusColor,
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation CTA */}
      <div
        style={{
          marginTop: 20,
          opacity: paramOpacities[3],
        }}
      >
        <div
          style={{
            background: colors.card,
            borderRadius: 18,
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transform: `scale(${cardPressed ? 0.98 : 1})`,
          }}
        >
          <div>
            <div style={{fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 4}}>
              View Recommended Filters
            </div>
            <div style={{fontSize: 14, color: colors.textMuted}}>
              Based on your water quality
            </div>
          </div>
          <ChevronRight size={24} color={colors.primaryLight} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </AbsoluteFill>
  );
};