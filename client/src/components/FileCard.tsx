import { Button } from '@/components/ui/button';
import { CgClose } from 'react-icons/cg';
import { Dispatch, SetStateAction } from 'react';

interface FileCardProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

function FileCard({ file, setFile }: FileCardProps) {
  return (
    <div
      className="absolute left-5 flex w-62.5 flex-col gap-2 rounded-[5px] bg-gray-200 p-3.5 text-blue-900 shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] transition-opacity duration-200"
      style={{ bottom: file ? '60px' : '0', opacity: file ? 1 : 0, pointerEvents: file ? 'auto' : 'none' }}
    >
      <div className="flex flex-row">
        <span className="text-sm text-blue-500">Attachment</span>
        <Button
          aria-label='Remove attachment'
          variant='ghost'
          size='icon-sm'
          className="ml-auto size-6.25 text-blue-600"
          onClick={() => setFile(null)}
        >
          <CgClose />
        </Button>
      </div>

      <div className="min-h-17.5 rounded-[5px] bg-gray-300 p-2.5">
        {file?.name}
      </div>
    </div>
  );
}
export default FileCard;
