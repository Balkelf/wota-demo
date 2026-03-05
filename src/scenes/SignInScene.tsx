import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Mail, Lock, ArrowRight, Droplet} from 'lucide-react';

const colors = {
  primary: '#0A2540',
  primaryLight: '#0066CC',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  border: '#E2E8F0',
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

export const SignInScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Form appears (0-30)
  const cardOpacity = smoothInterpolate(frame, [0, 20], [0, 1]);
  const cardY = smoothInterpolate(frame, [0, 30], [30, 0]);

  // Phase 2: Type email (30-90) - REAL EMAIL
  const emailText = "sarah.johnson@email.com";
  const emailChars = Math.min(Math.floor((frame - 30) / 3), emailText.length);
  const showEmailTyping = frame >= 30 && frame < 90;
  const displayEmail = showEmailTyping ? emailText.slice(0, emailChars) : (frame >= 90 ? emailText : "");

  // Phase 4: Type password (120-180) - 8 dots
  const passwordDots = frame >= 180 ? 8 : Math.max(0, Math.floor((frame - 120) / 8));
  const showPasswordTyping = frame >= 120 && frame < 180;

  // Phase 6: Click sign in (210-240)
  const buttonPressed = frame >= 210;
  const buttonScale = buttonPressed ? 0.96 : 1;
  const buttonShadow = buttonPressed 
    ? '0 5px 15px rgba(0, 102, 204, 0.4)'
    : '0 10px 30px rgba(0, 102, 204, 0.2)';

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          width: 700,
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        {/* Logo */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 60}}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${colors.primaryLight}, #00B4D8)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0, 102, 204, 0.2)',
            }}
          >
            <Droplet size={40} color="white" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 16,
            letterSpacing: '-1px',
          }}
        >
          Welcome to Wota
        </h1>
        <p
          style={{
            fontSize: 24,
            color: colors.textMuted,
            textAlign: 'center',
            marginBottom: 60,
          }}
        >
          Check your water quality
        </p>

        {/* Form card */}
        <div
          style={{
            background: colors.card,
            borderRadius: 24,
            padding: 50,
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          }}
        >
          {/* Email field */}
          <div style={{marginBottom: 30}}>
            <label style={{display: 'block', fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 12}}>
              Email
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 24px',
                border: `2px solid ${frame >= 30 ? colors.primaryLight : colors.border}`,
                borderRadius: 16,
                background: '#FAFAFA',
                transition: 'border-color 0.3s',
              }}
            >
              <Mail size={24} color={colors.textMuted} />
              <span style={{fontSize: 22, color: displayEmail ? colors.text : '#9CA3AF', flex: 1}}>
                {displayEmail || 'sarah.johnson@email.com'}
              </span>
              {showEmailTyping && (
                <span
                  style={{
                    width: 2,
                    height: 24,
                    background: colors.primaryLight,
                    opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          </div>

          {/* Password field */}
          <div style={{marginBottom: 40}}>
            <label style={{display: 'block', fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 12}}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 24px',
                border: `2px solid ${frame >= 120 ? colors.primaryLight : colors.border}`,
                borderRadius: 16,
                background: '#FAFAFA',
                transition: 'border-color 0.3s',
              }}
            >
              <Lock size={24} color={colors.textMuted} />
              <span style={{fontSize: 22, color: colors.text, flex: 1, letterSpacing: 3}}>
                {'•'.repeat(passwordDots)}
              </span>
              {showPasswordTyping && (
                <span
                  style={{
                    width: 2,
                    height: 24,
                    background: colors.primaryLight,
                    opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          </div>

          {/* Sign in button */}
          <button
            style={{
              width: '100%',
              padding: '24px',
              background: `linear-gradient(135deg, ${colors.primaryLight}, #00B4D8)`,
              border: 'none',
              borderRadius: 16,
              color: 'white',
              fontSize: 24,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: 'pointer',
              transform: `scale(${buttonScale})`,
              boxShadow: buttonShadow,
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            Sign In
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Sign up link */}
        <p style={{textAlign: 'center', marginTop: 30, fontSize: 18, color: colors.textMuted}}>
          Don't have an account? <span style={{color: colors.primaryLight, fontWeight: 600}}>Sign up</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};