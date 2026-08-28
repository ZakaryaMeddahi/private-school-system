/**
 * The Cloudinary upload response that `FilesService.create` destructures.
 *
 * Not an entity — it models the third-party payload, so the field names are
 * Cloudinary's (`public_id`, `resource_type`, `bytes`) rather than ours.
 */
export type UploadResult = {
  public_id: string;
  url: string;
  resource_type: string;
  format: string;
  bytes: number;
};

export const makeUploadResult = (
  overrides: Partial<UploadResult> = {},
): UploadResult => ({
  public_id: 'lecture-notes',
  url: 'https://res.cloudinary.com/demo/raw/upload/lecture-notes.pdf',
  resource_type: 'raw',
  format: 'pdf',
  bytes: 1024,
  ...overrides,
});
