import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Droplets, AlertTriangle, AlertCircle, Check, TrendingUp, TrendingDown, Shield, Zap, Beaker} from 'lucide-react';

// WCAG AAA compliant colors (7:1 contrast minimum)
const colors = {
  primary: '#0077B6',
  secondary: '#0096C7',
  accent: '#00B4D8',
  warning: '#B45309',      // Dark amber for AAA
  danger: '#B91C1C',       // Dark red for AAA
  success: '#047857',      // Dark emerald for AAA
  background: '#F0F9FF',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  glass: 'rgba(255, 255, 255, 0.92)',
};

// Premium easing approximation
const easeOutPremium = (t: number) => 1 - Math.pow(1 - t, 4);

const smoothInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[]
) => {
  const progress = interpolate(frame, inputRange, [0, 1]);
  return interpolate(easeOutPremium(progress), [0, 1], outputRange);
};

// Realistic UK water quality data
const waterData = {
  hardness: {
    value: 280,
    max: 400,
    unit: 'mg/l',
    label: 'Hardness',
    status: 'high',
    description: 'Very Hard Water',
  },
  chlorine: {
    value: 0.42,
    max: 1.0,
    unit: 'mg/l',
    label: 'Chlorine',
    status: 'normal',
    description: 'Within safe limits',
  },
  ph: {
    value: 7.8,
    max: 14,
    unit: '',
    label: 'pH Level',
    status: 'normal',
    description: 'Slightly alkaline',
  },
  lead: {
    value: 2.3,
    max: 10,
    unit: 'µg/l',
    label: 'Lead',
    status: 'low',
    description: 'Below regulatory limit',
  },
  nitrates: {
    value: 18.5,
    max: 50,
    unit: 'mg/l',
    label: 'Nitrates',
    status: 'normal',
    description: 'Acceptable level',
  },
  pfas: {
    value: 12,
    max: 100,
    unit: 'ng/l',
    label: 'PFAS',
    status: 'detectable',
    description: '12 ng/l detected',
  },
};

// Circular progress gauge
const CircularProgress: React.FC<{
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  delay: number;
  icon?: React.ReactNode;
}> = ({value, max, label, unit, color, delay, icon}) => {
  const frame = useCurrentFrame();
  
  const progress = Math.max(0, Math.min(1, smoothInterpolate(frame, [delay, delay + 25], [0, 1])));
  const percentage = (value / max) * 100;
  const strokeDashoffset = 283 - (283 * percentage * progress) / 100;
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
      <div style={{position: 'relative', width: 150, height: 150}}>
        {/* Background circle */}
        <svg style={{position: 'absolute', top: 0, left: 0, width: 150, height: 150}}>
          <circle
            cx={75}
            cy={75}
            r={65}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={7}
          />
          {/* Progress circle */}
          <circle
            cx={75}
            cy={75}
            r={65}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={283}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 75 75)"
            style={{
              filter: `drop-shadow(0 0 8px ${color}35)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 150,
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{fontSize: 38, fontWeight: 700, color: colors.text}}>
            {unit === '' ? (value * progress).toFixed(1) : Math.round(value * progress)}
          </div>
          <div style={{fontSize: 16, color: colors.textMuted}}>{unit}</div>
        </div>
      </div>
      <div style={{fontSize: 20, fontWeight: 600, color: colors.text, display: 'flex', alignItems: 'center', gap: 6}}>
        {icon}
        {label}
      </div>
    </div>
  );
};

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Card entrance with smooth easing
  const cardScale = smoothInterpolate(frame, [0, 25], [0.92, 1]);
  const cardOpacity = smoothInterpolate(frame, [0, 20], [0, 1]);

  // Header slide
  const headerY = smoothInterpolate(frame, [0, 25], [-20, 0]);

  // Alert entrance
  const alertOpacity = smoothInterpolate(frame, [45, 60], [0, 1]);

  // Data items stagger
  const data1Opacity = smoothInterpolate(frame, [65, 80], [0, 1]);
  const data2Opacity = smoothInterpolate(frame, [75, 90], [0, 1]);
  const data3Opacity = smoothInterpolate(frame, [85, 100], [0, 1]);

  // Alert pulse
  const alertPulse = 1 + Math.sin(frame * 0.06) * 0.008;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        padding: 45,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 35,
          opacity: cardOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div>
          <div style={{fontSize: 48, fontWeight: 700, color: colors.text, letterSpacing: '-1px'}}>
            SW1A 1AA
          </div>
          <div style={{fontSize: 24, color: colors.textMuted, marginTop: 6}}>
            Thames Water • London
          </div>
        </div>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0, 119, 182, 0.25)',
          }}
        >
          <Droplets size={36} color="white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Main card with glassmorphism */}
      <div
        style={{
          background: colors.glass,
          backdropFilter: 'blur(24px)',
          borderRadius: 36,
          padding: 45,
          boxShadow: `
            0 20px 50px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          border: '1px solid rgba(255,255,255,0.6)',
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 35,
          }}
        >
          Your Water Quality
        </div>

        {/* Circular gauges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 40,
          }}
        >
          <CircularProgress
            value={waterData.hardness.value}
            max={waterData.hardness.max}
            label="Hardness"
            unit="mg/l"
            color={colors.warning}
            delay={15}
            icon={<Beaker size={18} color={colors.warning} style={{marginRight: 4}} />}
          />
          <CircularProgress
            value={waterData.chlorine.value}
            max={waterData.chlorine.max}
            label="Chlorine"
            unit="mg/l"
            color={colors.success}
            delay={25}
            icon={<Zap size={18} color={colors.success} style={{marginRight: 4}} />}
          />
          <CircularProgress
            value={waterData.ph.value}
            max={waterData.ph.max}
            label="pH Level"
            unit=""
            color={colors.primary}
            delay={35}
          />
        </div>

        {/* Alert card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: 22,
            padding: 24,
            borderLeft: `5px solid ${colors.warning}`,
            boxShadow: '0 8px 24px rgba(180, 83, 9, 0.12)',
            transform: `scale(${alertPulse})`,
            opacity: alertOpacity,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10}}>
            <AlertTriangle size={28} color={colors.warning} strokeWidth={2} />
            <span style={{fontSize: 24, fontWeight: 600, color: colors.warning}}>
              {waterData.hardness.description}
            </span>
          </div>
          <div style={{fontSize: 20, color: '#92400E', lineHeight: 1.5}}>
            Can dry out skin and hair. May reduce appliance lifespan.
          </div>
        </div>
      </div>

      {/* Health implications */}
      <div
        style={{
          marginTop: 30,
          opacity: data1Opacity,
          transform: `translateY(${(1 - data1Opacity) * 15}px)`,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 3px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={22} color="white" strokeWidth={2.5} />
          </div>
          <div style={{flex: 1, fontSize: 20, color: colors.text}}>
            Lead risk: <strong style={{color: colors.success}}>Low ({waterData.lead.value} µg/l)</strong>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          opacity: data2Opacity,
          transform: `translateY(${(1 - data2Opacity) * 15}px)`,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 3px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${colors.warning}, #D97706)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertCircle size={22} color="white" strokeWidth={2} />
          </div>
          <div style={{flex: 1, fontSize: 20, color: colors.text}}>
            PFAS: <strong style={{color: colors.warning}}>{waterData.pfas.description}</strong>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          opacity: data3Opacity,
          transform: `translateY(${(1 - data3Opacity) * 15}px)`,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 3px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={22} color="white" strokeWidth={2} />
          </div>
          <div style={{flex: 1, fontSize: 20, color: colors.text}}>
            Nitrates: <strong style={{color: colors.primary}}>{waterData.nitrates.value} mg/l (safe)</strong>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};