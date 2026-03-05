import React from 'react';
import {AbsoluteFill} from 'remotion';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({children}) => {
  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* iPhone outer frame */}
      <div
        style={{
          width: 1125,
          height: 2170,
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
          borderRadius: 65,
          padding: 20,
          boxShadow: `
            0 0 0 3px #3a3a3a,
            0 50px 100px rgba(0,0,0,0.5),
            inset 0 2px 4px rgba(255,255,255,0.1)
          `,
          position: 'relative',
        }}
      >
        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: 'absolute',
            top: 35,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 180,
            height: 50,
            background: '#000',
            borderRadius: 25,
            zIndex: 100,
          }}
        />

        {/* Camera */}
        <div
          style={{
            position: 'absolute',
            top: 42,
            left: '50%',
            transform: 'translateX(30px)',
            width: 20,
            height: 20,
            background: '#1a1a1a',
            borderRadius: '50%',
            border: '3px solid #2a2a2a',
            zIndex: 101,
          }}
        />

        {/* Screen bezel */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#000',
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Side buttons */}
        <div
          style={{
            position: 'absolute',
            right: -3,
            top: 250,
            width: 6,
            height: 100,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -3,
            top: 180,
            width: 6,
            height: 50,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -3,
            top: 260,
            width: 6,
            height: 80,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -3,
            top: 360,
            width: 6,
            height: 80,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 3,
          }}
        />

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 8,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 4,
            zIndex: 100,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};