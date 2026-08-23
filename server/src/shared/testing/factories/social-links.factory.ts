import { SocialLinks } from '../../entities/socialLinks.entity';
import { makeUser } from './user.factory';

export const makeSocialLinks = (
  overrides: Partial<SocialLinks> = {},
): SocialLinks => ({
  id: 1,
  linkedIn: null,
  facebook: null,
  twitter: null,
  github: null,
  youtube: null,
  website: null,
  user: makeUser(),
  ...overrides,
});
