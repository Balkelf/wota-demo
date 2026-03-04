import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
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
      {/* Scene 1: Landing (0-90 frames = 0-3 seconds) */}
      <Sequence from={0} durationInFrames={90}>
        <LandingScene />
      </Sequence>

      {/* Scene 2: Results (90-210 frames = 3-7 seconds) */}
      <Sequence from={90} durationInFrames={120}>
        <ResultsScene />
      </Sequence>

      {/* Scene 3: Recommendation (210-300 frames = 7-10 seconds) */}
      <Sequence from={210} durationInFrames={90}>
        <RecommendationScene />
      </Sequence>
    </AbsoluteFill>
  );
};
