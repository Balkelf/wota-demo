import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Search, MapPin, Droplet, ChevronRight} from 'lucide-react';

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

export const LandingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene timing (240-480 frames = 8-16 seconds, relative 0-240)
  const localFrame = frame - 240;

  // Phase 1: Screen appears (0-30)
  const contentOpacity = smoothInterpolate(localFrame, [0, 30], [0, 1]);
  const contentY = smoothInterpolate(localFrame, [0, 30], [30, 0]);

  // Phase 2: Type postcode (30-90)
  const postcodeText = "SW1A";
  const postcodeChars = Math.min(Math.floor((localFrame - 30) / 15), postcodeText.length);
  const showTyping = localFrame >= 30 && localFrame < 90;
  const displayPostcode = showTyping ? postcodeText.slice(0, postcodeChars) : (localFrame >= 90 ? postcodeText : "");

  // Phase 3: Dropdown appears (90-120)
  const dropdownOpacity = smoothInterpolate(localFrame, [90, 110], [0, 1]);
  const dropdownY = smoothInterpolate(localFrame, [90, 110], [-10, 0]);
  const showDropdown = localFrame >= 90;

  // Phase 4: Select option (120-180)
  const selectedIndex = localFrame >= 150 ? 0 : -1;

  // Phase 5: Click search (180-240)
  const buttonPressed = localFrame >= 200;
  const buttonScale = buttonPressed ? 0.98 : 1;

  const suggestions = [
    { postcode: 'SW1A 1AA', area: 'Westminster, London' },
    { postcode: 'SW1A 0AA', area: 'Buckingham Palace' },
    { postcode: 'SW1A 2AA', area: ' Downing Street' },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background} 0%, #E0F2FE 100%)`,
        padding: 60,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
          marginBottom: 60,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20}}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${colors.primaryLight}, #00B4D8)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Droplet size={32} color="white" />
          </div>
          <span style={{fontSize: 36, fontWeight: 700, color: colors.text}}>Wota</span>
        </div>
        <h1 style={{fontSize: 56, fontWeight: 700, color: colors.text, lineHeight: 1.2, marginBottom: 16}}>
          Check your water quality
        </h1>
        <p style={{fontSize: 28, color: colors.textMuted}}>
          Enter your postcode to see what's in your tap water
        </p>
      </div>

      {/* Search card */}
      <div
        style={{
          background: colors.card,
          borderRadius: 24,
          padding: 40,
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          opacity: contentOpacity,
        }}
      >
        {/* Search input */}
        <div style={{marginBottom: 20}}>
          <label style={{display: 'block', fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 12}}>
            Your postcode
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '24px',
              border: `2px solid ${localFrame >= 30 ? colors.primaryLight : colors.border}`,
              borderRadius: 16,
              background: '#FAFAFA',
            }}
          >
            <MapPin size={28} color={colors.textMuted} />
            <span style={{fontSize: 28, color: displayPostcode ? colors.text : '#9CA3AF', flex: 1}}>
              {displayPostcode || 'Enter postcode'}
            </span>
            {showTyping && (
              <span
                style={{
                  width: 2,
                  height: 28,
                  background: colors.primaryLight,
                  opacity: Math.sin(localFrame * 0.2) > 0 ? 1 : 0,
                }}
              />
            )}
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 30,
              opacity: dropdownOpacity,
              transform: `translateY(${dropdownY}px)`,
            }}
          >
            {suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: selectedIndex === i ? '#F0F9FF' : 'transparent',
                  borderBottom: i < suggestions.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <MapPin size={20} color={colors.primaryLight} />
                <div>
                  <div style={{fontSize: 22, fontWeight: 600, color: colors.text}}>{s.postcode}</div>
                  <div style={{fontSize: 16, color: colors.textMuted}}>{s.area}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search button */}
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
            boxShadow: buttonPressed 
              ? '0 5px 20px rgba(0, 102, 204, 0.4)'
              : '0 10px 30px rgba(0, 102, 204, 0.2)',
          }}
        >
          <Search size={24} />
          Check Water Quality
        </button>
      </div>

      {/* Trust signals */}
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          gap: 40,
          opacity: contentOpacity,
        }}
      >
        {[
          { icon: '✓', text: 'Official data' },
          { icon: '✓', text: 'No signup required' },
          { icon: '✓', text: '100% independent' },
        ].map((item, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, color: colors.textMuted}}>
            <span style={{color: '#0D7A3E', fontSize: 20}}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};