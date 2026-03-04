import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const colors = {
  primary: '#0EA5E9',
  secondary: '#06B6D4',
  accent: '#14B8A6',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F0F9FF',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  glass: 'rgba(255, 255, 255, 0.9)',
};

// Circular progress gauge
const CircularProgress: React.FC<{
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  delay: number;
}> = ({value, max, label, unit, color, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 20, stiffness: 100},
  });
  
  const percentage = (value / max) * 100;
  const strokeDashoffset = 283 - (283 * percentage * progress) / 100;
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15}}>
      <div style={{position: 'relative', width: 160, height: 160}}>
        {/* Background circle */}
        <svg style={{position: 'absolute', top: 0, left: 0, width: 160, height: 160}}>
          <circle
            cx={80}
            cy={80}
            r={70}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={8}
          />
          {/* Progress circle */}
          <circle
            cx={80}
            cy={80}
            r={70}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={283}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
            style={{
              filter: `drop-shadow(0 0 10px ${color}40)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 160,
            height: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{fontSize: 42, fontWeight: 700, color: colors.text}}>
            {Math.round(value * progress)}
          </div>
          <div style={{fontSize: 18, color: colors.textMuted}}>{unit}</div>
        </div>
      </div>
      <div style={{fontSize: 22, fontWeight: 600, color: colors.text}}>{label}</div>
    </div>
  );
};

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Card entrance
  const cardSpring = spring({
    frame,
    fps,
    config: {damping: 25, stiffness: 120},
  });

  // Alert pulse
  const alertPulse = Math.sin(frame * 0.08) * 0.02 + 1;

  // Health tip stagger
  const tip1Spring = spring({
    frame: frame - 60,
    fps,
    config: {damping: 20, stiffness: 100},
  });
  const tip2Spring = spring({
    frame: frame - 75,
    fps,
    config: {damping: 20, stiffness: 100},
  });

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
          opacity: cardSpring,
          transform: `translateY(${(1 - cardSpring) * -20}px)`,
        }}
      >
        <div>
          <div style={{fontSize: 52, fontWeight: 700, color: colors.text, letterSpacing: '-1px'}}>
            SW1A 1AA
          </div>
          <div style={{fontSize: 26, color: colors.textMuted, marginTop: 8}}>
            Thames Water • London
          </div>
        </div>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 25,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)',
          }}
        >
          <span style={{fontSize: 40}}>💧</span>
        </div>
      </div>

      {/* Main card with glassmorphism */}
      <div
        style={{
          background: colors.glass,
          backdropFilter: 'blur(20px)',
          borderRadius: 40,
          padding: 50,
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          border: '1px solid rgba(255,255,255,0.5)',
          opacity: cardSpring,
          transform: `scale(${0.9 + cardSpring * 0.1})`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 40,
          }}
        >
          Your Water Quality
        </div>

        {/* Circular gauges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 50,
          }}
        >
          <CircularProgress
            value={280}
            max={400}
            label="Hardness"
            unit="mg/l"
            color={colors.warning}
            delay={20}
          />
          <CircularProgress
            value={0.5}
            max={1}
            label="Chlorine"
            unit="mg/l"
            color={colors.accent}
            delay={35}
          />
          <CircularProgress
            value={7.8}
            max={14}
            label="pH Level"
            unit=""
            color={colors.primary}
            delay={50}
          />
        </div>

        {/* Alert card with glassmorphism */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: 25,
            padding: 30,
            borderLeft: `6px solid ${colors.warning}`,
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.15)',
            transform: `scale(${alertPulse})`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15}}>
            <span style={{fontSize: 32}}>⚠️</span>
            <span style={{fontSize: 28, fontWeight: 600, color: '#92400E'}}>Very Hard Water</span>
          </div>
          <div style={{fontSize: 22, color: '#B45309', lineHeight: 1.5}}>
            Can dry out skin and hair. May reduce appliance lifespan.
          </div>
        </div>
      </div>

      {/* Health implications */}
      <div
        style={{
          marginTop: 40,
          opacity: tip1Spring,
          transform: `translateY(${(1 - tip1Spring) * 20}px)`,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 20,
            padding: 25,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{fontSize: 24}}>✓</span>
          </div>
          <div style={{flex: 1, fontSize: 22, color: colors.text}}>
            Lead risk: <strong>Low</strong>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 15,
          opacity: tip2Spring,
          transform: `translateY(${(1 - tip2Spring) * 20}px)`,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 20,
            padding: 25,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              background: `linear-gradient(135deg, ${colors.warning}, #FB923C)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{fontSize: 24}}>!</span>
          </div>
          <div style={{flex: 1, fontSize: 22, color: colors.text}}>
            PFAS: <strong style={{color: colors.warning}}>12 ng/l detected</strong>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
