import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BulkActionsBar({
  count,
  onApproveAll,
  onRejectAll,
  onClear,
}: {
  count: number;
  onApproveAll: () => void;
  onRejectAll: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-[#1A1A2E] px-5 py-3 text-white shadow-lg">
      <span className="text-sm font-medium">{count} selected</span>
      <Button
        size="sm"
        className="bg-green-500 text-white hover:bg-green-600"
        onClick={onApproveAll}
      >
        <Check />
        Approve All
      </Button>
      <Button
        size="sm"
        className="bg-red-500 text-white hover:bg-red-600"
        onClick={onRejectAll}
      >
        <X />
        Reject All
      </Button>
      <button
        onClick={onClear}
        className="text-sm text-white/70 hover:text-white"
      >
        Clear
      </button>
    </div>
  );
}
