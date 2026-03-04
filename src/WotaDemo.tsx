import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SignInScene} from './scenes/SignInScene';
import {LandingScene} from './scenes/LandingScene';
import {ResultsScene} from './scenes/ResultsScene';
import {RecommendationScene} from './scenes/RecommendationScene';

export const WotaDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Scene 0: Sign-in (0-240 frames = 0-8 seconds) */}
      <Sequence from={0} durationInFrames={240}>
        <SignInScene />
      </Sequence>

      {/* Scene 1: Landing (240-480 frames = 8-16 seconds) */}
      <Sequence from={240} durationInFrames={240}>
        <LandingScene />
      </Sequence>

      {/* Scene 2: Results (480-720 frames = 16-24 seconds) */}
      <Sequence from={480} durationInFrames={240}>
        <ResultsScene />
      </Sequence>

      {/* Scene 3: Recommendation (720-900 frames = 24-30 seconds) */}
      <Sequence from={720} durationInFrames={180}>
        <RecommendationScene />
      </Sequence>
    </AbsoluteFill>
  );
};