import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

const colors = {
  primary: '#0066CC',
  primaryLight: '#00B4D8',
};

interface ButtonProps {
  children: React.ReactNode;
  pressFrame?: number;
  onPressDuration?: number;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  pressFrame = 0,
  onPressDuration = 30,
  style = {},
  icon,
}) => {
  const frame = useCurrentFrame();
  
  // Check if button is in pressed state
  const isPressed = frame >= pressFrame && frame < pressFrame + onPressDuration;
  const pressProgress = isPressed 
    ? interpolate(frame, [pressFrame, pressFrame + onPressDuration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  
  // Scale animation: quick press down, slow release
  const pressScale = isPressed 
    ? interpolate(pressProgress, [0, 0.3, 1], [1, 0.95, 0.98], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  
  // Ripple effect
  const rippleOpacity = isPressed 
    ? interpolate(pressProgress, [0, 0.5, 1], [0.3, 0.1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  
  const rippleScale = isPressed 
    ? interpolate(pressProgress, [0, 1], [0.5, 2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  // Shadow intensity on press
  const shadowIntensity = isPressed ? 0.4 : 0.2;
  const shadowSpread = isPressed ? 5 : 10;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 16,
        ...style,
      }}
    >
      <button
        style={{
          width: '100%',
          padding: '24px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
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
          transform: `scale(${pressScale})`,
          boxShadow: `0 ${shadowSpread}px 30px rgba(0, 102, 204, ${shadowIntensity})`,
          transition: 'transform 0.1s ease-out',
          ...style,
        }}
      >
        {children}
        {icon}
      </button>
      
      {/* Ripple overlay */}
      {isPressed && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.5)',
            opacity: rippleOpacity,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
