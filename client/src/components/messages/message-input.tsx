'use client';

import { useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { Paperclip, Smile, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ChatMessage, Course } from '@/app/providers/ChatProvider';

export function MessageInput({
  messages,
  setMessages,
  chatNamespace,
  selectedCourse,
  chatId,
  isLoading,
  setIsLoading,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatNamespace: React.RefObject<Socket | null>;
  selectedCourse: Course | null;
  chatId?: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !file) return;

    setIsLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      if (content) formData.append('content', content);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/courses/${selectedCourse?.id}/chats/${chatId}/messages`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
          }
        );
        const { data } = await response.json();
        setMessages([...messages, data]);
      } catch (err) {
        console.error(err);
      } finally {
        setContent('');
        setFile(null);
        setIsLoading(false);
      }
      return;
    }

    chatNamespace.current?.emit('message', {
      message: { content },
      chatId,
    });
    setContent('');
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-3 border-t bg-white px-4 py-3"
    >
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3EEFF] hover:text-[#6C3CE1]"
      >
        <Paperclip size={18} />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*, .pdf"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={!selectedCourse}
      />

      <div className="relative flex-1">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={file ? file.name : 'Send a message...'}
          disabled={!selectedCourse}
          className="h-10 rounded-full pr-9"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9CA3AF]"
        >
          <Smile size={16} />
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading || (!content && !file)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6C3CE1] text-white transition-colors hover:bg-[#5A2EC0] disabled:opacity-40"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
