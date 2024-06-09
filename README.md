# Private-School
Online School Provide The Ability For Tutors To Teach Remotely Without The Need For Any Other Platform For Streaming, And Share Resources And Global Chat For Students to Discuss The Course Topics In Simple Words This Platform Is A Combination Of Google Classroom + Google Meet + Chat Application

# API Design

# Authentication

- HTTP Authentication, scheme: bearer

# Auth

## POST Register

POST /api/v1/auth/register

Create an account for **Students**

> Body Parameters

```json
{
  "firstName": "Zakarya",
  "lastName": "Meddahi",
  "email": "<email>",
  "password": "<password>"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» firstName|body|string| yes |none|
|» lastName|body|string| yes |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 201 Response

```json
{
  "status": "success",
  "message": "User Registered successfully",
  "data": {
    "id": "1",
    "email": "<email>",
    "firstName": "Zakarya",
    "lastName": "Meddahi",
    "role": "student",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:01:44.308Z",
    "createdAt": "2024-06-09T10:01:44.318Z",
    "updatedAt": "2024-06-09T10:01:44.318Z",
    "access_token": "<token>"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## POST Login

POST /api/v1/auth/login

**All Users** can login, a user object containing JWT (access_token) should be returned

> Body Parameters

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 201 Response

```json
{
  "status": "success",
  "message": "User logged in successfully",
  "data": {
    "id": "1",
    "email": "<email>",
    "firstName": "Zakarya",
    "lastName": "Meddahi",
    "role": "student",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:04:12.973Z",
    "createdAt": "2024-04-01T03:57:30.858Z",
    "updatedAt": "2024-04-02T19:23:53.494Z",
    "access_token": "token"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Courses

## POST Create Course

POST /api/v1/courses

- Creating courses can be performed by __Teachers__

> Body Parameters

```json
{
  "title": "Node Js Course",
  "description": "In this course you will learn how to create APIs using Express js and MongoDB",
  "price": 100,
  "language": "English",
  "difficulty": "Easy",
  "enrollmentLimit": 1000,
  "duration": 2,
  "durationUnit": "Month",
  "deadline": "12-12-2024",
  "topics": [
    {
      "title": "Introduction to Node Js",
      "startTime": "12-12-2024"
    }
  ]
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» description|body|string| yes |none|
|» price|body|integer| yes |none|
|» language|body|string| yes |none|
|» difficulty|body|string| yes |none|
|» enrollmentLimit|body|integer| yes |none|
|» duration|body|integer| yes |none|
|» durationUnit|body|string| yes |none|
|» deadline|body|string| yes |none|
|» topics|body|[object]| yes |none|
|»» title|body|string| no |none|
|»» startTime|body|string| no |none|

> Response Examples

> 201 Response

```json
{
  "status": "success",
  "message": "Course created successfully",
  "data": {
    "id": "1",
    "title": "Node Js Course",
    "description": "In this course you will learn how to create APIs using Express js and MongoDB",
    "price": 100,
    "language": "English",
    "difficulty": "Easy",
    "duration": 2,
    "durationUnit": "Month",
    "deadline": "12-12-2024",
    "file": null,
    "requirements": null,
    "teacher": {
      "id": "1"
    },
    "topics": [
      {
        "id": "1",
        "title": "Introduction to Node Js"
      }
    ],
    "createdAt": "2024-06-09T10:14:25.740Z",
    "updatedAt": "2024-06-09T10:14:25.740Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get Courses

GET /api/v1/courses

- __All Users__ are allowed to get courses

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Courses retrieved successfully",
  "data": [
    {
      "id": "1",
      "title": "Node Js Course",
      "description": "In this course you will learn how to create APIs using Express js and MongoDB",
      "price": 100,
      "language": "English",
      "difficulty": "Easy",
      "duration": 2,
      "durationUnit": "Month",
      "deadline": "12-12-2024",
      "file": null,
      "requirements": null,
      "teacher": {
        "id": "1"
      },
      "topics": [
        {
          "id": "1",
          "title": "Introduction to Node Js"
        }
      ],
      "createdAt": "2024-06-09T10:14:25.740Z",
      "updatedAt": "2024-06-09T10:14:25.740Z"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get One Course

GET /api/v1/courses/1

- __All Users__ are allowed to get a course by id

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Course created successfully",
  "data": {
    "id": "1",
    "title": "Node Js Course",
    "description": "In this course you will learn how to create APIs using Express js and MongoDB",
    "price": 100,
    "language": "English",
    "difficulty": "Easy",
    "duration": 2,
    "durationUnit": "Month",
    "deadline": "12-12-2024",
    "file": null,
    "requirements": null,
    "teacher": {
      "id": "1"
    },
    "topics": [
      {
        "id": "1",
        "title": "Introduction to Node Js"
      }
    ],
    "createdAt": "2024-06-09T10:14:25.740Z",
    "updatedAt": "2024-06-09T10:14:25.740Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## PATCH Update Course

PATCH /api/v1/courses/1

- __Admin__ and __Course Creator__ (__Teacher__) can update the course

> Body Parameters

```json
{
  "title": "Node Js Course",
  "description": "In this course you will learn how to create APIs using Express js and MongoDB",
  "price": 120,
  "language": "English",
  "difficulty": "Medium",
  "enrollmentLimit": 1000,
  "duration": 3,
  "durationUnit": "Month",
  "deadline": "12-12-2024",
  "topics": [
    {
      "id": 1,
      "title": "Introduction to Node Js",
      "startTime": "12-12-2024",
      "isDeleted": false
    }
  ]
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» description|body|string| yes |none|
|» price|body|integer| yes |none|
|» language|body|string| yes |none|
|» difficulty|body|string| yes |none|
|» enrollmentLimit|body|integer| yes |none|
|» duration|body|integer| yes |none|
|» durationUnit|body|string| yes |none|
|» deadline|body|string| yes |none|
|» topics|body|[object]| yes |none|
|»» id|body|integer| no |none|
|»» title|body|string| no |none|
|»» startTime|body|string| no |none|
|»» isDeleted|body|boolean| no |none|

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Course created successfully",
  "data": {
    "id": "1",
    "title": "Node Js Course",
    "description": "In this course you will learn how to create APIs using Express js and MongoDB",
    "price": 120,
    "language": "English",
    "difficulty": "Easy",
    "duration": 3,
    "durationUnit": "Month",
    "deadline": "12-12-2024",
    "file": null,
    "requirements": null,
    "teacher": {
      "id": "1"
    },
    "topics": [
      {
        "id": "1",
        "title": "Introduction to Node Js"
      }
    ],
    "createdAt": "2024-06-09T10:14:25.740Z",
    "updatedAt": "2024-06-09T10:14:25.740Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## DELETE Remove Course

DELETE /api/v1/courses/1

- Only the __Teacher__ is allowed to remove his courses

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Course deleted successfully"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Rooms

## POST Create Room

POST /api/v1/courses/1/rooms

- __Admin__ and __Course Creator__ (__Teacher__) can create new rooms for course

> Body Parameters

```json
{
  "name": "new room",
  "status": "open"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» slug|body|string| yes |none|
|» status|body|string| yes |none|

> Response Examples

> 201 Response

```json
{
  "status": "success",
  "message": "Room created successfully",
  "data": {
    "name": "new room",
    "status": "open",
    "course": {
      "id": 1
    },
    "id": "1",
    "createdAt": "2024-06-09T20:26:41.799Z",
    "updatedAt": "2024-06-09T20:26:41.799Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get Rooms

GET /api/v1/courses/1/rooms

- **Course Creator** (**Teacher**) and **Admin** can see rooms
- **Enrolled Students** with **accepted status** can see rooms of that specific course

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Loaded rooms successfully",
  "data": [
    {
      "id": "1",
      "name": "new room",
      "status": "open",
      "createdAt": "2024-06-09T20:25:31.852Z",
      "updatedAt": "2024-06-09T20:25:31.852Z"
    },
    {
      "id": "2",
      "name": "General",
      "status": "open",
      "createdAt": "2024-06-09T20:26:41.799Z",
      "updatedAt": "2024-06-09T20:26:41.799Z"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

<!-- ## PATCH Update Room

PATCH /api/v1/rooms/1

- **Course Creator** and __Admin__ can update rooms

> Body Parameters

```json
{
  "name": "new room",
  "status": "open"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» slug|body|string| yes |none|
|» status|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema -->

<!-- ## DELETE Remove Room

DELETE /api/v1/rooms/id

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema -->

<!-- # Users

## POST Create User

POST /api/v1/users

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## GET Get Users

GET /api/v1/users

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## PATCH Update User

PATCH /api/v1/users/id

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## DELETE Remove User

DELETE /api/v1/users/id

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema -->

# Teachers

## POST Create Teacher

POST /api/v1/teachers

- **Admin** can create accounts for teachers (**Teacher** should receive email with his credentials to use them in login)

> Body Parameters

```json
{
  "firstName": "Sid Ahmed",
  "lastName": "Abdelali",
  "email": "<email>"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» firstName|body|string| yes |none|
|» lastName|body|string| yes |none|
|» email|body|string| yes |none|

> Response Examples

> 201 Response

```json
{
  "status": "success",
  "message": "Teacher created successfully",
  "data": {
    "id": "2",
    "firstName": "Sid Ahmed",
    "lastName": "Abdelali",
    "email": "<email>",
    "role": "teacher",
    "biography": null,
    "profilePicture": null,
    "address": null,
    "isActive": true,
    "lastLogging": null,
    "createdAt": "2024-06-09T20:38:19.978Z",
    "updatedAt": "2024-06-09T20:38:19.978Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get My Account

GET /api/v1/teachers/account/me

- The extracted userId from JWT will be used in this case to get the __Teacher__ profile

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Account data loaded successfully",
  "data": {
    "id": "1",
    "firstName": "Sid Ahmed",
    "lastName": "Abdelali",
    "email": "<email>",
    "role": "teacher",
    "biography": null,
    "profilePicture": "https://res.cloudinary.com/private-school/image/upload/v1714805559/e7d1510bbbae907bf2d24a4c9a2c10960d503b10.png",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:04:12.973Z",
    "createdAt": "2024-04-01T03:57:30.858Z",
    "updatedAt": "2024-04-02T19:23:53.494Z",
    "socialLinks": {
      "id": "1",
      "linkedIn": null,
      "facebook": null,
      "twitter": null,
      "github": null,
      "youtube": null,
      "website": null
    }
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## PATCH Update My Account

PATCH /api/v1/teachers/account/me

- The **Teacher** can update his own account info

> Body Parameters

```json
{
  "firstName": "Sid Ahmed",
  "lastName": "Abdellali"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» firstName|body|string| yes |none|
|» lastName|body|string| yes |none|

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Account data updated successfully",
  "data": {
    "id": "1",
    "firstName": "Sid Ahmed",
    "lastName": "Abdellali",
    "email": "<email>",
    "role": "teacher",
    "biography": null,
    "profilePicture": "https://res.cloudinary.com/private-school/image/upload/v1714805559/e7d1510bbbae907bf2d24a4c9a2c10960d503b10.png",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:04:12.973Z",
    "createdAt": "2024-04-01T03:57:30.858Z",
    "updatedAt": "2024-06-09T20:52:57.651Z",
    "socialLinks": {
      "id": "1",
      "linkedIn": null,
      "facebook": null,
      "twitter": null,
      "github": null,
      "youtube": null,
      "website": null
    }
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## PATCH Update Profile Picture

PATCH /api/v1/teachers/account/me/profile-picture

- **The Teacher** can upload a profile picture (so in this case the file should be sent in the request body as form data)

> Body Parameters

```yaml
image: string
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» Image|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Profile picture updated successfully",
  "data": {
    "id": "1",
    "firstName": "Sid Ahmed",
    "lastName": "Abdellali",
    "email": "<email>",
    "role": "teacher",
    "biography": null,
    "profilePicture": "http://res.cloudinary.com/private-school/image/upload/v1717967295/Apex.png",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:04:12.973Z",
    "createdAt": "2024-04-01T03:57:30.858Z",
    "updatedAt": "2024-06-09T20:52:57.651Z",
    "socialLinks": {
      "id": "1",
      "linkedIn": null,
      "facebook": null,
      "twitter": null,
      "github": null,
      "youtube": null,
      "website": null
    }
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## DELETE Remove Teacher

DELETE /api/v1/teachers/id

- **Admin** can remove **Teachers**

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Teacher account removed successfully"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Students

## GET Get My Account

GET /api/v1/students/account/me

- The extracted userId from JWT will be used in this case to get the __Student__ profile

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## PATCH Update My Account

PATCH /api/v1/students/account/me

- The **Teacher** can update his account info

> Body Parameters

```json
{
  "firstName": "Sid Ahmed",
  "lastName": "Abdelali"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» firstName|body|string| yes |none|
|» lastName|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## PATCH Update Profile Picture

PATCH /api/v1/students/account/me/profile-picture

- **The Teacher** can upload a profile picture (so in this case the file should be sent in the request)

> Body Parameters

```yaml
image: string

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» image|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## DELETE Remove Student

DELETE /api/v1/students/id

- **Admin** can remove __Students__

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

# Enrollments

## POST Enroll

POST /api/v1/courses/25/enrollments

- __Students__ can enroll in courses

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## GET Get Enrollments

GET /api/v1/courses/enrollments

- **Admin** can see students enrollments of all courses

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## GET Get Enrollments By Course Id

GET /api/v1/courses/1/enrollments

- __Admin__ and __Teacher__ can see enrollments by course

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## PATCH Update Enrollment

PATCH /api/v1/enrollments/id

- **Admin** can accept or reject __Students__ enrollments by updating the status property

> Body Parameters

```json
{
  "enrollmentStatus": "approved"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» enrollmentStatus|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## DELETE Cancel Enrollment

DELETE /api/v1/courses/enrollments/6

- __Students__ can cancel their enrollments

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

# Chats

## GET Get Chat

GET /api/v1/courses/5/chats/1

- **Admin** and **Course Creator** can see course chat
- Enrolled **Students** with accepted status can see chat

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## GET Get Chats

GET /api/v1/courses/courseId/chats

- **Admin** and **Course Creator** can see chats in of course
- Enrolled Students with accepted status can see chats

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

## PATCH Update Chat

PATCH /api/v1/courses/courseId/chats

- __Admin__ and __Course Creator__ can update chat

> Body Parameters

```json
{
  "name": "general chat"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

# File-Messages

## POST Upload File

POST /api/v1/courses/6/chats/2/messages

- __Admin__ and __Course Creator__ can upload file as message (send file message)

> Body Parameters

```yaml
file: string

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» file|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

# Social-Accounts

## PATCH Update Social Links

PATCH /api/v1/social-links/3

- __All Users__ can update their social link urls

> Body Parameters

```json
{
  "linkedIn": "new linked in url"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» linkedIn|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

# Data Schema

