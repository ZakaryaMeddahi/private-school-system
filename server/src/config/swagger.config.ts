import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

/**
 * Path the docs are served from. Kept off `api` so it never collides with the
 * `api/v1/*` routes exposed by the controllers.
 */
export const SWAGGER_PATH = 'docs';

/** Security scheme name referenced by `@ApiBearerAuth(JWT_AUTH)` on protected controllers. */
export const JWT_AUTH = 'JWT-auth';

const API_TITLE = 'Private School System API';

const API_DESCRIPTION = `
REST API of the Private School System — courses, enrollments, live sessions and
course chats for admins, teachers and students.

## Authentication
Every endpoint except \`POST /api/v1/auth/register\` and \`POST /api/v1/auth/login\`
requires a JWT sent as \`Authorization: Bearer <token>\`.

1. Register or log in to obtain an \`accessToken\`.
2. Click **Authorize** above and paste the token.
3. The token is kept between page reloads, so you only do this once.

## Authorization
Access is additionally scoped by role (\`ADMIN\`, \`TEACHER\`, \`STUDENT\`) and, for
course-scoped resources, by enrollment. A valid token for the wrong role returns
\`403 Forbidden\`.

## Conventions
- All routes are versioned under \`/api/v1\`.
- Successful responses are wrapped as \`{ status, message, data }\`.
- Errors follow the Nest exception shape: \`{ statusCode, message, error }\`.
- Request bodies are validated with \`class-validator\`; violations return \`400\`.

## Realtime
Chat and live-session events travel over Socket.IO and are therefore **not** part
of this document. Socket connections authenticate with the same bearer token.
`;

/** Tag names must match the `@ApiTags(...)` values used on the controllers. */
const API_TAGS: ReadonlyArray<[name: string, description: string]> = [
  ['Auth', 'Registration and login — start here to get a token'],
  ['Users', 'Account lookups shared by every role'],
  ['Teachers', 'Teacher profiles and their taught courses'],
  ['Students', 'Student profiles and their learning activity'],
  ['Courses', 'Course catalogue, content and cover images'],
  ['Enrollments', 'Enrolling students into courses and tracking status'],
  ['Chats', 'Per-course discussion channels'],
  ['Messages', 'Messages and attachments inside a chat'],
  ['Rooms', 'Live session rooms attached to a course'],
  ['Social Links', 'Social profiles attached to a user'],
];

export interface SwaggerSetupOptions {
  /** Port the app listens on, used to advertise the local server. */
  port: number;
  /** Public base URL of a deployed instance, if any (e.g. https://api.example.com). */
  publicUrl?: string;
}

function buildDocument(
  app: INestApplication,
  { port, publicUrl }: SwaggerSetupOptions,
): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion('1.0.0')
    .setContact(
      'Zakarya Meddahi',
      'https://github.com/ZakaryaMeddahi/private-school-system',
      '',
    )
    .setLicense(
      'Proprietary',
      'https://github.com/ZakaryaMeddahi/private-school-system',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'Paste the `accessToken` returned by the auth endpoints.',
      },
      JWT_AUTH,
    )
    .addServer(`http://localhost:${port}`, 'Local development');

  if (publicUrl) {
    builder.addServer(publicUrl, 'Deployed');
  }

  for (const [name, description] of API_TAGS) {
    builder.addTag(name, description);
  }

  return SwaggerModule.createDocument(app, builder.build(), {
    // Stable, readable operation ids for generated clients (`login` instead of
    // `AuthController_login`).
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });
}

const CUSTOM_OPTIONS: SwaggerCustomOptions = {
  customSiteTitle: `${API_TITLE} — Documentation`,
  jsonDocumentUrl: `${SWAGGER_PATH}/json`,
  yamlDocumentUrl: `${SWAGGER_PATH}/yaml`,
  swaggerOptions: {
    // Keep the entered token across reloads so "Try it out" stays usable.
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
};

export function setupSwagger(
  app: INestApplication,
  options: SwaggerSetupOptions,
): void {
  SwaggerModule.setup(
    SWAGGER_PATH,
    app,
    () => buildDocument(app, options),
    CUSTOM_OPTIONS,
  );
}
