import { Button } from '@/components/ui/button';
import GoogleIcon from './GoogleIcon';

// No Google OAuth flow exists yet in this app (the previous button had no
// handler either) — this only restyles the entry point. Wire `onClick` up
// to a real OAuth flow when that backend integration is ready.
const SocialLoginButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-11 w-full gap-2.5 rounded-lg border-[#E2E8F0] bg-white text-sm font-medium text-[#111827] hover:bg-[#F8FAFC]"
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  );
};

export default SocialLoginButton;
