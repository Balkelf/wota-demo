import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Mail, Lock, ArrowRight, Droplets, User} from 'lucide-react';

// WCAG AAA compliant colors
const colors = {
  primary: '#0077B6',
  secondary: '#0096C7',
  accent: '#00B4D8',
  warning: '#B45309',
  success: '#047857',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#475569',
  border: '#E2E8F0',
};

// Premium easing
const easeOutPremium = (t: number) => 1 - Math.pow(1 - t, 4);

const smoothInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[]
) => {
  const progress = interpolate(frame, inputRange, [0, 1]);
  return interpolate(easeOutPremium(progress), [0, 1], outputRange);
};

export const SignInScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Card entrance
  const cardOpacity = smoothInterpolate(frame, [0, 20], [0, 1]);
  const cardY = smoothInterpolate(frame, [0, 25], [30, 0]);

  // Logo scale
  const logoScale = smoothInterpolate(frame, [0, 25], [0.8, 1]);

  // Title fade
  const titleOpacity = smoothInterpolate(frame, [10, 30], [0, 1]);
  const titleY = smoothInterpolate(frame, [10, 30], [15, 0]);

  // Email field
  const emailOpacity = smoothInterpolate(frame, [25, 40], [0, 1]);
  const emailX = smoothInterpolate(frame, [25, 40], [-20, 0]);

  // Password field
  const passwordOpacity = smoothInterpolate(frame, [35, 50], [0, 1]);
  const passwordX = smoothInterpolate(frame, [35, 50], [-20, 0]);

  // Button
  const buttonOpacity = smoothInterpolate(frame, [45, 60], [0, 1]);
  const buttonScale = smoothInterpolate(frame, [45, 60], [0.95, 1]);

  // Typing animation for email
  const emailText = "you@example.com";
  const emailChars = Math.min(Math.floor((frame - 45) / 3), emailText.length);
  const showEmailTyping = frame >= 45 && frame < 75;
  const displayEmail = showEmailTyping ? emailText.slice(0, emailChars) : (frame >= 75 ? emailText : "");

  // Password dots
  const passwordDots = frame >= 75 ? 12 : Math.floor((frame - 70) / 2);
  const showPasswordTyping = frame >= 70;

  // Button glow pulse
  const glowPulse = 0.3 + Math.sin(frame * 0.08) * 0.1;

  // Forgot password link
  const forgotOpacity = smoothInterpolate(frame, [55, 70], [0, 1]);

  // Sign up link
  const signupOpacity = smoothInterpolate(frame, [65, 80], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}08 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent}08 0%, transparent 70%)`,
        }}
      />

      {/* Sign in card */}
      <div
        style={{
          background: colors.card,
          borderRadius: 32,
          padding: 50,
          width: '100%',
          maxWidth: 520,
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.02)
          `,
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 36,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 12px 30px rgba(0, 119, 182, 0.25)`,
            }}
          >
            <Droplets size={36} color="white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 36,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div style={{fontSize: 32, fontWeight: 700, color: colors.text, marginBottom: 8}}>
            Welcome back
          </div>
          <div style={{fontSize: 18, color: colors.textMuted}}>
            Sign in to access your water reports
          </div>
        </div>

        {/* Email input */}
        <div
          style={{
            marginBottom: 20,
            opacity: emailOpacity,
            transform: `translateX(${emailX}px)`,
          }}
        >
          <label style={{display: 'block', fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 8}}>
            Email
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: colors.background,
              border: `2px solid ${colors.border}`,
              borderRadius: 14,
              padding: '16px 18px',
              transition: 'border-color 0.2s',
            }}
          >
            <Mail size={20} color={colors.textMuted} style={{marginRight: 12}} />
            <div
              style={{
                flex: 1,
                fontSize: 18,
                color: displayEmail ? colors.text : colors.textMuted,
              }}
            >
              {displayEmail || 'you@example.com'}
              {frame >= 45 && frame < 75 && frame % 6 < 3 && (
                <span style={{
                  display: 'inline-block',
                  width: 2,
                  height: 20,
                  background: colors.primary,
                  marginLeft: 2,
                  verticalAlign: 'middle',
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Password input */}
        <div
          style={{
            marginBottom: 24,
            opacity: passwordOpacity,
            transform: `translateX(${passwordX}px)`,
          }}
        >
          <label style={{display: 'block', fontSize: 15, fontWeight: 500, color: colors.text, marginBottom: 8}}>
            Password
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: colors.background,
              border: `2px solid ${colors.border}`,
              borderRadius: 14,
              padding: '16px 18px',
            }}
          >
            <Lock size={20} color={colors.textMuted} style={{marginRight: 12}} />
            <div style={{flex: 1, fontSize: 18, color: colors.text, letterSpacing: 2}}>
              {showPasswordTyping && '•'.repeat(Math.max(0, passwordDots))}
              {!showPasswordTyping && (
                <span style={{color: colors.textMuted}}>••••••••</span>
              )}
              {showPasswordTyping && frame % 6 < 3 && frame < 90 && (
                <span style={{
                  display: 'inline-block',
                  width: 2,
                  height: 20,
                  background: colors.primary,
                  marginLeft: 4,
                  verticalAlign: 'middle',
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Forgot password */}
        <div
          style={{
            textAlign: 'right',
            marginBottom: 28,
            opacity: forgotOpacity,
          }}
        >
          <span style={{fontSize: 15, color: colors.primary, fontWeight: 500}}>
            Forgot password?
          </span>
        </div>

        {/* Sign in button */}
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${buttonScale})`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              padding: '20px 36px',
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 600,
              textAlign: 'center',
              boxShadow: `0 10px 30px rgba(0, 119, 182, ${glowPulse})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            Sign In
            <ArrowRight size={20} />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '28px 0',
            opacity: forgotOpacity,
          }}
        >
          <div style={{flex: 1, height: 1, background: colors.border}} />
          <span style={{padding: '0 16px', fontSize: 14, color: colors.textMuted}}>or</span>
          <div style={{flex: 1, height: 1, background: colors.border}} />
        </div>

        {/* Sign up link */}
        <div
          style={{
            textAlign: 'center',
            opacity: signupOpacity,
          }}
        >
          <span style={{fontSize: 16, color: colors.textMuted}}>
            Don't have an account?{' '}
            <span style={{color: colors.primary, fontWeight: 600}}>Sign up</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};