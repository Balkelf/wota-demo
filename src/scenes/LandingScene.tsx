import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random} from 'remotion';
import {Droplets, MapPin, Check, ArrowRight, Mail, Lock} from 'lucide-react';

// Premium easing function: cubic-bezier(0.16, 1, 0.3, 1)
// Approximated for Remotion: easeOutExpo-like smooth deceleration
const easeOutPremium = (t: number) => 1 - Math.pow(1 - t, 4); // Close approximation to cubic-bezier(0.16, 1, 0.3, 1)

// WCAG AAA compliant color palette (7:1 contrast ratio minimum)
const colors = {
  primary: '#0077B6',      // Deep blue - meets AAA on white
  secondary: '#0096C7',    // Ocean blue
  accent: '#00B4D8',       // Bright teal
  warning: '#B45309',      // Amber dark - AAA compliant
  success: '#047857',      // Emerald dark - AAA compliant
  background: '#F0F9FF',
  card: '#FFFFFF',
  text: '#0F172A',         // Near black - AAA on all backgrounds
  textMuted: '#475569',    // Darker gray - AAA on white
  glass: 'rgba(255, 255, 255, 0.85)',
};

// Particle system for ambient motion
const WaterParticles: React.FC<{seed: number}> = ({seed}) => {
  const frame = useCurrentFrame();
  const particles = [];
  
  for (let i = 0; i < 12; i++) {
    const startX = random(`x-${seed}-${i}`) * 1080;
    const startY = random(`y-${seed}-${i}`) * 1920;
    const size = random(`s-${seed}-${i}`) * 15 + 4;
    const speed = random(`v-${seed}-${i}`) * 0.4 + 0.2;
    const opacity = random(`o-${seed}-${i}`) * 0.2 + 0.08;
    
    const x = startX + Math.sin(frame * 0.015 * speed + i) * 40;
    const y = (startY + frame * speed * 1.5) % 2200 - 200;
    
    particles.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0, 119, 182, ${opacity}) 0%, transparent 70%)`,
          filter: 'blur(2px)',
        }}
      />
    );
  }
  
  return <>{particles}</>;
};

// Smooth interpolate wrapper with premium easing
const smoothInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[],
  options?: {extrapolateRight?: string}
) => {
  const progress = interpolate(frame, inputRange, [0, 1], options);
  return interpolate(easeOutPremium(progress), [0, 1], outputRange, options);
};

export const LandingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  // Logo entrance with smooth easing
  const logoScale = smoothInterpolate(frame, [0, 30], [0.8, 1]);
  const logoOpacity = smoothInterpolate(frame, [0, 25], [0, 1]);

  // Text reveal with stagger
  const textOpacity = smoothInterpolate(frame, [20, 45], [0, 1]);
  const textY = smoothInterpolate(frame, [20, 45], [30, 0]);

  // Input slide with smooth easing
  const inputOpacity = smoothInterpolate(frame, [40, 70], [0, 1]);
  const inputY = smoothInterpolate(frame, [40, 70], [40, 0]);

  // Trust signals stagger
  const trustOpacity = smoothInterpolate(frame, [60, 85], [0, 1]);

  // Postcode input typing animation
  const postcodeChars = "SW1A 1AA";
  const typedChars = Math.min(Math.floor((frame - 45) / 4), postcodeChars.length);
  const showPostcode = frame > 45;
  const displayPostcode = postcodeChars.slice(0, typedChars);

  // Autocomplete dropdown
  const showAutocomplete = frame > 70 && frame < 90;
  const autocompleteOpacity = smoothInterpolate(frame, [70, 80], [0, 1]);

  // Ripple animation
  const ripple1Scale = interpolate(frame, [0, 90], [0, 3], {extrapolateRight: 'clamp'});
  const ripple1Opacity = interpolate(frame, [0, 60, 90], [0.5, 0.2, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient overlay */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.015) * 15}% ${50 + Math.cos(frame * 0.015) * 15}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
        }}
      />

      {/* Water particles */}
      <WaterParticles seed={1} />

      {/* Ripple effects */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: '50%',
          border: `2px solid rgba(255,255,255,${ripple1Opacity})`,
          transform: `scale(${ripple1Scale})`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 60,
        }}
      >
        {/* Logo with smooth entrance */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Droplet icon with premium styling */}
          <div
            style={{
              width: 160,
              height: 160,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              borderRadius: '50%',
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.25),
                inset 0 -20px 40px rgba(255,255,255,0.15),
                inset 0 20px 40px rgba(255,255,255,0.25)
              `,
            }}
          >
            <Droplets 
              size={80} 
              color="white" 
              strokeWidth={1.5}
              style={{filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'}}
            />
          </div>

          {/* App name with premium typography */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-3px',
              textShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}
          >
            Wota
          </div>
        </div>

        {/* Tagline with smooth reveal */}
        <div
          style={{
            marginTop: 36,
            fontSize: 40,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            textShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          What's really in your tap water?
        </div>

        {/* Postcode input with glassmorphism */}
        <div
          style={{
            marginTop: 70,
            opacity: inputOpacity,
            transform: `translateY(${inputY}px)`,
          }}
        >
          <div
            style={{
              width: 680,
              height: 90,
              background: colors.glass,
              backdropFilter: 'blur(24px)',
              borderRadius: 28,
              border: '1px solid rgba(255,255,255,0.35)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 32px',
              boxShadow: `
                0 12px 48px rgba(0,0,0,0.12),
                inset 0 1px 0 rgba(255,255,255,0.45)
              `,
            }}
          >
            <MapPin size={28} color="rgba(255,255,255,0.7)" style={{marginRight: 16}} />
            <div
              style={{
                fontSize: 32,
                color: showPostcode && displayPostcode ? 'white' : 'rgba(255,255,255,0.6)',
                flex: 1,
                fontFamily: 'inherit',
              }}
            >
              {showPostcode ? displayPostcode || 'Enter your postcode' : 'Enter your postcode'}
            </div>
            {/* Animated cursor */}
            <div
              style={{
                width: 2,
                height: 36,
                backgroundColor: 'white',
                opacity: Math.sin(frame * 0.12) > 0 ? 1 : 0,
              }}
            />
          </div>

          {/* Autocomplete dropdown */}
          {showAutocomplete && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: 12,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(24px)',
                borderRadius: 20,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                opacity: autocompleteOpacity,
              }}
            >
              {['SW1A 1AA - Westminster', 'SW1A 0AA - Westminster', 'SW1A 2AA - Westminster'].map((suggestion, i) => (
                <div
                  key={i}
                  style={{
                    padding: '18px 28px',
                    fontSize: 24,
                    color: colors.text,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: i === 0 ? `${colors.primary}15` : 'transparent',
                    borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <MapPin size={20} color={colors.primary} />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            display: 'flex',
            gap: 36,
            opacity: trustOpacity,
          }}
        >
          {[
            'Based on official data',
            'No signup required',
            '100% independent'
          ].map((text, i) => (
            <div
              key={i}
              style={{
                fontSize: 20,
                color: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Check size={18} strokeWidth={2.5} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};