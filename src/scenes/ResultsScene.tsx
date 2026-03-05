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

// Water parameter data with visual ranges
const waterData = [
  {
    name: 'Hardness',
    value: 280,
    unit: 'mg/l',
    status: 'warning',
    icon: Droplet,
    explanation: 'Very hard - can cause limescale',
    goodMax: 120,
    max: 400,
  },
  {
    name: 'Chlorine',
    value: 0.5,
    unit: 'mg/l',
    status: 'good',
    icon: Shield,
    explanation: 'Safe levels',
    goodMax: 1,
    max: 2,
  },
  {
    name: 'pH',
    value: 7.8,
    unit: '',
    status: 'good',
    icon: Droplet,
    explanation: 'Neutral - ideal for drinking',
    goodMin: 6.5,
    goodMax: 8.5,
    min: 0,
    max: 14,
  },
  {
    name: 'PFAS',
    value: 12,
    unit: 'ng/l',
    status: 'warning',
    icon: AlertTriangle,
    explanation: 'Above recommended limits',
    goodMax: 4,
    max: 20,
  },
];

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Water glass appears (0-60)
  const glassOpacity = smoothInterpolate(frame, [0, 40], [0, 1]);
  const glassScale = smoothInterpolate(frame, [0, 50], [0.8, 1]);

  // Phase 2: Parameters reveal (60-180)
  const paramsOpacity = smoothInterpolate(frame, [60, 100], [0, 1]);
  const paramOpacities = [
    smoothInterpolate(frame, [80, 110], [0, 1]),
    smoothInterpolate(frame, [100, 130], [0, 1]),
    smoothInterpolate(frame, [120, 150], [0, 1]),
    smoothInterpolate(frame, [140, 170], [0, 1]),
  ];

  // Phase 3: CTA (200-240)
  const ctaOpacity = smoothInterpolate(frame, [200, 230], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        padding: 40,
        paddingBottom: 120,
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb items={['Sign in', 'Postcode', 'Results']} />

      {/* Water Glass Visualization - HERO */}
      <div
        style={{
          opacity: glassOpacity,
          transform: `scale(${glassScale})`,
          marginBottom: 30,
        }}
      >
        {/* Full-width water glass container */}
        <div
          style={{
            width: '100%',
            height: 320,
            background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.05) 0%, rgba(14, 165, 233, 0.15) 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glass container */}
          <div
            style={{
              width: 180,
              height: 280,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.8) 100%)',
              borderRadius: '0 0 40px 40px',
              border: '3px solid rgba(14, 165, 233, 0.3)',
              borderTop: 'none',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(14, 165, 233, 0.2)',
            }}
          >
            {/* Water fill */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '85%',
                background: `linear-gradient(180deg, 
                  rgba(14, 165, 233, 0.3) 0%, 
                  rgba(6, 182, 212, 0.4) 50%,
                  rgba(14, 165, 233, 0.5) 100%)`,
                borderRadius: '0 0 37px 37px',
              }}
            >
              {/* Water surface shimmer */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  transform: `translateX(${Math.sin(frame * 0.05) * 20}px)`,
                }}
              />

              {/* Particles in water - representing contaminants */}
              {[
                { x: 30, y: 60, size: 8, color: 'rgba(245, 158, 11, 0.6)' },
                { x: 80, y: 120, size: 6, color: 'rgba(245, 158, 11, 0.5)' },
                { x: 50, y: 180, size: 10, color: 'rgba(245, 158, 11, 0.4)' },
                { x: 100, y: 100, size: 5, color: 'rgba(180, 83, 9, 0.5)' },
                { x: 70, y: 200, size: 7, color: 'rgba(245, 158, 11, 0.5)' },
              ].map((particle, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: particle.x,
                    top: particle.y + Math.sin(frame * 0.03 + i) * 5,
                    width: particle.size,
                    height: particle.size,
                    borderRadius: '50%',
                    background: particle.color,
                    opacity: 0.7 + Math.sin(frame * 0.05 + i * 2) * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Glass rim */}
            <div
              style={{
                position: 'absolute',
                top: -3,
                left: -3,
                right: -3,
                height: 6,
                background: 'rgba(14, 165, 233, 0.4)',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Score overlay */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              background: 'white',
              padding: '16px 24px',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{fontSize: 14, color: colors.textMuted, marginBottom: 4}}>Water Score</div>
            <div style={{fontSize: 32, fontWeight: 700, color: colors.primaryLight}}>72</div>
          </div>

          {/* Location badge */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              background: 'white',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{fontSize: 18, fontWeight: 600, color: colors.text}}>SW1A 1AA</div>
            <div style={{fontSize: 13, color: colors.textMuted}}>Thames Water</div>
          </div>

          {/* Alert badge */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              background: '#FEF3C7',
              padding: '10px 16px',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertTriangle size={18} color={colors.warning} />
            <span style={{fontSize: 14, fontWeight: 600, color: colors.warning}}>2 concerns detected</span>
          </div>
        </div>
      </div>

      {/* Parameters - Compact list */}
      <div
        style={{
          opacity: paramsOpacity,
          marginBottom: 20,
        }}
      >
        <h2 style={{fontSize: 20, fontWeight: 600, color: colors.text, marginBottom: 12}}>
          Water Quality
        </h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {waterData.map((param, i) => {
            const Icon = param.icon;
            const statusColor = param.status === 'good' ? colors.success : 
                              param.status === 'warning' ? colors.warning : colors.danger;
            
            // Calculate bar position
            const barPosition = param.min !== undefined
              ? ((param.value - param.min) / (param.max - param.min)) * 100
              : (param.value / param.max) * 100;
            
            const goodRangeStart = param.min !== undefined
              ? ((param.goodMin! - param.min) / (param.max - param.min)) * 100
              : 0;
            const goodRangeEnd = param.goodMax
              ? (param.goodMax / param.max) * 100
              : (param.goodMax / param.max) * 100;
            
            return (
              <div
                key={i}
                style={{
                  background: '#FAFAFA',
                  borderRadius: 12,
                  padding: 14,
                  opacity: paramOpacities[i],
                  transform: `translateX(${(1 - paramOpacities[i]) * -15}px)`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `${statusColor}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={statusColor} />
                    </div>
                    <div>
                      <div style={{fontSize: 16, fontWeight: 600, color: colors.text}}>{param.name}</div>
                      <div style={{fontSize: 12, color: statusColor}}>{param.explanation}</div>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontSize: 18, fontWeight: 700, color: colors.text}}>{param.value}{param.unit}</div>
                  </div>
                </div>

                {/* Visual bar */}
                <div style={{height: 6, background: '#E2E8F0', borderRadius: 3, position: 'relative'}}>
                  {/* Good range */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${goodRangeStart}%`,
                      width: `${goodRangeEnd - goodRangeStart}%`,
                      top: 0,
                      bottom: 0,
                      background: `${colors.success}30`,
                      borderRadius: 3,
                    }}
                  />
                  {/* Current value */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${barPosition}%`,
                      top: -5,
                      width: 16,
                      height: 16,
                      background: statusColor,
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            background: colors.card,
            borderRadius: 16,
            padding: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          <div>
            <div style={{fontSize: 16, fontWeight: 600, color: colors.text}}>View Filters</div>
            <div style={{fontSize: 13, color: colors.textMuted}}>Based on your water quality</div>
          </div>
          <ChevronRight size={22} color={colors.primaryLight} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </AbsoluteFill>
  );
};