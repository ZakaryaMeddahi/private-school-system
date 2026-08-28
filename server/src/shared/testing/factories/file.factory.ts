import { File } from '../../entities/file.entity';
import { FROZEN_NOW } from '../frozen-clock';

export const makeFile = (overrides: Partial<File> = {}): File => ({
  id: 1,
  name: 'lecture-notes',
  url: 'https://res.cloudinary.com/demo/raw/upload/lecture-notes.pdf',
  type: 'raw',
  format: 'pdf',
  size: 1024,
  createdAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  course: null,
  message: null,
  ...overrides,
});
