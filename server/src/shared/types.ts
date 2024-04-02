import { File } from './entities/file.entity';
import { Topic } from './entities/topic.entity';
import {
  Difficulty,
  DurationUnit,
  EnrollmentStatus,
  Role,
  RoomStatus,
} from './enums';

export type JwtPayload = {
  sub: number;
  email: string;
  role: Role;
};

export type LoginUserParams = {
  email: string;
  password: string;
};

export type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
};

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  role: Role;
};

export type UpdateUserParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  role?: Role;
};

export type CreateCourseParams = {
  title: string;
  description: string;
  price: number;
  language: string;
  difficulty: Difficulty;
  enrollmentLimit: number;
  duration: number;
  durationUnit: DurationUnit;
  topics: Topic[];
};

export type UpdateCourseParams = {
  title?: string;
  description?: string;
  price?: number;
  language?: string;
  difficulty?: Difficulty;
  enrollmentLimit?: number;
  duration?: number;
  durationUnit?: DurationUnit;
  topics?: Topic[];
};

export type CreateTopicParams = {
  title: string;
  startTime: Date;
};

export type UpdateTopicParams = {
  id?: number;
  title?: string;
  startTime?: Date;
  isDeleted?: boolean;
};

export type CreateRoomParams = {
  name: string;
  slug: string;
  status: RoomStatus;
};

export type UpdateRoomParams = {
  name?: string;
  slug?: string;
  status?: RoomStatus;
};

export type CreateChatParams = {
  name: string;
};

export type UpdateChatParams = {
  name?: string;
};

export type CreateEnrollmentParams = {
  enrollmentStatus: EnrollmentStatus;
  progress: number;
  enrollmentDate: Date;
};

export type UpdateEnrollmentParams = {
  enrollmentStatus?: EnrollmentStatus;
  progress?: number;
  enrollmentDate?: Date;
};

export type CreateMessageParams = {
  content: string;
  isPinned?: boolean;
  file: File;
};

export type UpdateMessageParams = {
  content?: string;
  isPinned?: boolean;
  file?: File;
};

export type MessagesOptions = {
  courseId: number;
  chatId?: number;
  roomId?: number;
  page?: number;
  pageSize?: number;
};

export type CreateSessionParams = {
  agoraChannel: string;
  agoraToken: string;
  startTime?: Date;
  endTime?: Date;
};

export type UpdateSessionParams = {
  agoraChannel?: string;
  agoraToken?: string;
  startTime?: Date;
  endTime: Date;
};

export type CreateTeacherParams = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UpdateTeacherParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  biography?: string;
};

export type CreateStudentParams = {
  biography?: string;
  profilePicture?: string;
};

export type UpdateStudentParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  biography?: string;
};

export interface CreateFileParams extends Express.Multer.File {}

export type CreateSocialLinksParams = {
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  website?: string;
};

export type UpdateSocialLinksParams = {
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  website?: string;
};

export type CreateStudentSessionParams = {
  joinDate: Date;
  leaveDate?: Date;
};

export type UpdateStudentSessionParams = {
  joinDate?: Date;
  leaveDate?: Date;
};
