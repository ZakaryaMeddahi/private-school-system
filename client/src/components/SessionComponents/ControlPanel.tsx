import NoiseButton from './NoiseButton';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import LeaveButton from './LeaveButton';
import ScreenButton from './ScreenButton';

function ControlPanel() {
  return (
    <div className="mb-5 flex w-fit flex-row items-center gap-3.75 rounded-[10px] bg-[whitesmoke] px-6.25 py-2.5">
      <NoiseButton />
      <ScreenButton />
      <CameraButton />
      <MicButton />
      <LeaveButton />
    </div>
  );
}
export default ControlPanel;
