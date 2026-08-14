'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

interface EditableFieldProps {
  defaultValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const EditableField = ({ defaultValue, onChange, className }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const commit = () => {
    setIsEditing(false);
    onChange(value);
  };

  const cancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={value}
        className={className}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') cancel();
        }}
      />
    );
  }

  return (
    <span
      className={`cursor-text ${className || ''}`}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
};

export default EditableField;
