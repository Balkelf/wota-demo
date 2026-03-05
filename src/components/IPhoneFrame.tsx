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
          padding: 12,
          boxShadow: `
            0 0 0 3px #3a3a3a,
            0 50px 100px rgba(0,0,0,0.5),
            inset 0 2px 4px rgba(255,255,255,0.1)
          `,
          position: 'relative',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 160,
            height: 45,
            background: '#000',
            borderRadius: 22,
            zIndex: 100,
          }}
        />

        {/* Camera */}
        <div
          style={{
            position: 'absolute',
            top: 38,
            left: '50%',
            transform: 'translateX(28px)',
            width: 18,
            height: 18,
            background: '#1a1a1a',
            borderRadius: '50%',
            border: '2px solid #2a2a2a',
            zIndex: 101,
          }}
        />

        {/* Screen bezel - This is where content goes */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#000',
            borderRadius: 55,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Side buttons */}
        <div
          style={{
            position: 'absolute',
            right: -2,
            top: 220,
            width: 5,
            height: 90,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -2,
            top: 160,
            width: 5,
            height: 45,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -2,
            top: 230,
            width: 5,
            height: 70,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -2,
            top: 320,
            width: 5,
            height: 70,
            background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)',
            borderRadius: 2,
          }}
        />

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 180,
            height: 7,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 3.5,
            zIndex: 100,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};