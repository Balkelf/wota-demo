import {Composition} from 'remotion';
import {WotaDemo} from './WotaDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WotaDemo"
        component={WotaDemo}
        durationInFrames={900}
        fps={30}
        width={1200}
        height={2400}
      />
    </>
  );
};