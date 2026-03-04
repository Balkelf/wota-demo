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
      {/* Scene 0: Sign-in (0-90 frames = 0-3 seconds) */}
      <Sequence from={0} durationInFrames={90}>
        <SignInScene />
      </Sequence>

      {/* Scene 1: Landing (90-180 frames = 3-6 seconds) */}
      <Sequence from={90} durationInFrames={90}>
        <LandingScene />
      </Sequence>

      {/* Scene 2: Results (180-300 frames = 6-10 seconds) */}
      <Sequence from={180} durationInFrames={120}>
        <ResultsScene />
      </Sequence>

      {/* Scene 3: Recommendation (300-390 frames = 10-13 seconds) */}
      <Sequence from={300} durationInFrames={90}>
        <RecommendationScene />
      </Sequence>
    </AbsoluteFill>
  );
};