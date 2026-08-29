import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ChatMessage } from '@/app/providers/ChatProvider';

function initialsOf(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';
}

function formatTime(time?: string) {
  if (!time) return '';
  return new Date(time).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function MessageBubble({
  message,
  isMine,
  showSender,
}: {
  message: ChatMessage;
  isMine: boolean;
  showSender: boolean;
}) {
  const initials = initialsOf(message.sender?.firstName, message.sender?.lastName);

  return (
    <div className={`flex gap-2 ${isMine ? 'ml-auto flex-row-reverse' : ''}`}>
      <Avatar size="sm" className="mt-auto shrink-0">
        <AvatarFallback
          className={
            isMine
              ? 'bg-[#6C3CE1] text-[10px] text-white'
              : 'bg-[#F3EEFF] text-[10px] text-[#6C3CE1]'
          }
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className={`flex max-w-[70%] flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        {showSender && !isMine && (
          <span className="mb-1 px-1 text-xs text-[#9CA3AF]">
            {message.sender?.firstName} {message.sender?.lastName}
          </span>
        )}

        <div
          className={
            isMine
              ? 'rounded-2xl rounded-tr-sm bg-[#6C3CE1] px-4 py-3 text-white'
              : 'rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-[#1A1A2E]'
          }
        >
          {message.file && (
            <a
              href={message.file.url}
              download
              target="_blank"
              rel="noreferrer"
              className={`mb-1.5 block truncate rounded-lg px-2 py-1.5 text-xs underline ${
                isMine ? 'bg-white/10' : 'bg-black/5'
              }`}
            >
              {message.file.name}
              {message.file.format ? `.${message.file.format}` : ''}
            </a>
          )}
          {message.content && (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        <span className="mt-1 px-1 text-[11px] text-[#9CA3AF]">
          {formatTime(message.sentAt)}
        </span>
      </div>
    </div>
  );
}
