# Private-School
Online School Provide The Ability For Tutors To Teach Remotely Without The Need For Any Other Platform For Streaming, And Sharing Resources, A Global Chat For Students to Discuss The Course Topics In Simple Words This Platform Is A Combination Of Google Classroom + Google Meet + Chat Application

# API Design

# Authentication

- HTTP Authentication, scheme: bearer

# Auth

## POST Register

POST `/api/v1/auth/register`

Create an account for **Students**

> Body Parameters

```json
{
  "firstName": "Zakaria",
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
    "firstName": "Zakaria",
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

POST `/api/v1/auth/login`

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
    "firstName": "Zakaria",
    "lastName": "Meddahi",
    "role": "student",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T10:04:12.973Z",
    "createdAt": "2024-04-01T03:57:30.858Z",
    "updatedAt": "2024-04-02T19:23:53.494Z",
    "access_token": "<token>"
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

POST `/api/v1/courses`

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

GET `/api/v1/courses`

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

GET `/api/v1/courses/1`

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

PATCH `/api/v1/courses/1`

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

DELETE `/api/v1/courses/1`

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

POST `/api/v1/courses/1/rooms`

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

GET `/api/v1/courses/1/rooms`

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

POST `/api/v1/teachers`

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

GET `/api/v1/teachers/account/me`

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

PATCH `/api/v1/teachers/account/me`

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

PATCH `/api/v1/teachers/account/me/profile-picture`

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

DELETE `/api/v1/teachers/1`

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

GET `/api/v1/students/account/me`

- The extracted userId from JWT will be used in this case to get the __Student__ profile

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Account data loaded successfully",
  "data": {
    "id": "1",
    "firstName": "Zakarya",
    "lastName": "Meddahi",
    "email": "<email>",
    "role": "student",
    "biography": null,
    "profilePicture": null,
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T21:20:52.191Z",
    "createdAt": "2024-04-28T13:44:01.045Z",
    "updatedAt": "2024-04-28T13:44:01.045Z",
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

PATCH `/api/v1/students/account/me`

- The **Student** can update his account info

> Body Parameters

```json
{
  "firstName": "Zakarya",
  "lastName": "Meddahi"
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
  "message": "Account data loaded successfully",
  "data": {
    "id": "1",
    "firstName": "Zakarya",
    "lastName": "Meddahi",
    "email": "<email>",
    "role": "student",
    "biography": null,
    "profilePicture": null,
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T21:20:52.191Z",
    "createdAt": "2024-04-28T13:44:01.045Z",
    "updatedAt": "2024-04-28T13:44:01.045Z",
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

PATCH `/api/v1/students/account/me/profile-picture`

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
{
  "status": "success",
  "message": "Account data loaded successfully",
  "data": {
    "id": "1",
    "firstName": "Zakarya",
    "lastName": "Meddahi",
    "email": "<email>",
    "role": "student",
    "biography": null,
    "profilePicture": "http://res.cloudinary.com/private-school/image/upload/v1717968607/businessman_506134.png",
    "address": null,
    "isActive": true,
    "lastLogging": "2024-06-09T21:20:52.191Z",
    "createdAt": "2024-04-28T13:44:01.045Z",
    "updatedAt": "2024-04-28T13:44:01.045Z",
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

## DELETE Remove Student

DELETE `/api/v1/students/1`

- **Admin** can remove __Students__

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Student account removed successfully"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Enrollments

## POST Enroll

POST /api/v1/courses/1/enrollments

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

> 201 Response

```json
{
  "status": "success",
  "message": "Enrolled successfully",
  "data": {
    "student": {
      "id": "1"
    },
    "course": {
      "id": "1"
    },
    "id": "1",
    "enrollmentStatus": "pending",
    "progress": 0,
    "enrollmentDate": "2024-06-09T22:15:52.654Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get Enrollments

GET `/api/v1/courses/enrollments`

- **Admin** can see students enrollments of all courses

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Enrollments retrieved successfully",
  "data": [
    {
      "id": "1",
      "enrollmentStatus": "pending",
      "progress": 0,
      "enrollmentDate": "2024-06-09T22:15:52.654Z",
      "student": {
          "id": "1",
          "biography": null,
          "profilePicture": null,
          "user": {
            "id": "1",
            "email": "<email>",
            "firstName": "Zakarya",
            "lastName": "Meddahi",
            "address": null,
            "role": "student",
            "isActive": true,
            "lastLogging": "2024-06-09T21:20:52.191Z",
            "createdAt": "2024-04-28T13:44:01.045Z",
            "updatedAt": "2024-04-28T13:44:01.045Z"
          }
      },
      "course": {
        "id": "1",
        "title": "Node Js Course",
        "description": "In this course you will learn how to create APIs using Express js and MongoDB",
        "price": 120,
        "language": "English",
        "difficulty": "Easy",
        "duration": 2,
        "durationUnit": "Month",
        "requirements": null,
        "deadline": "2024-12-11T23:00:00.000Z",
        "createdAt": "2024-06-09T20:25:31.811Z",
        "updatedAt": "2024-06-09T20:25:31.811Z",
        "teacher": {
          "id": "1",
          "biography": null,
          "profilePicture": "http://res.cloudinary.com/private-school/image/upload/v1717968607/businessman_506134.png",
          "user": {
            "id": "2",
            "email": "<email>",
            "firstName": "Sid Ahmed",
            "lastName": "Abdellali",
            "address": null,
            "role": "teacher",
            "isActive": true,
            "lastLogging": "2024-06-09T10:04:12.973Z",
            "createdAt": "2024-04-01T03:57:30.858Z",
            "updatedAt": "2024-06-09T20:52:57.651Z"
          }
        },
        "file": null
      }
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get Enrollments By Course Id

GET `/api/v1/courses/1/enrollments`

- __Admin__ and __Teacher__ can see enrollments by course

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Enrollments retrieved successfully",
  "data": [
    {
      "id": "1",
      "enrollmentStatus": "pending",
      "progress": 0,
      "enrollmentDate": "2024-06-09T22:15:52.654Z",
      "student": {
          "id": "1",
          "biography": null,
          "profilePicture": null,
          "user": {
            "id": "1",
            "email": "<email>",
            "firstName": "Zakarya",
            "lastName": "Meddahi",
            "address": null,
            "role": "student",
            "isActive": true,
            "lastLogging": "2024-06-09T21:20:52.191Z",
            "createdAt": "2024-04-28T13:44:01.045Z",
            "updatedAt": "2024-04-28T13:44:01.045Z"
          }
      },
      "course": {
        "id": "1",
        "title": "Node Js Course",
        "description": "In this course you will learn how to create APIs using Express js and MongoDB",
        "price": 120,
        "language": "English",
        "difficulty": "Easy",
        "duration": 2,
        "durationUnit": "Month",
        "requirements": null,
        "deadline": "2024-12-11T23:00:00.000Z",
        "createdAt": "2024-06-09T20:25:31.811Z",
        "updatedAt": "2024-06-09T20:25:31.811Z",
        "teacher": {
          "id": "1",
          "biography": null,
          "profilePicture": "http://res.cloudinary.com/private-school/image/upload/v1717968607/businessman_506134.png",
          "user": {
            "id": "2",
            "email": "<email>",
            "firstName": "Sid Ahmed",
            "lastName": "Abdellali",
            "address": null,
            "role": "teacher",
            "isActive": true,
            "lastLogging": "2024-06-09T10:04:12.973Z",
            "createdAt": "2024-04-01T03:57:30.858Z",
            "updatedAt": "2024-06-09T20:52:57.651Z"
          }
        },
        "file": null
      }
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## PATCH Update Enrollment

PATCH `/api/v1/enrollments/1`

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
{
  "status": "success",
  "message": "Enrollment updated successfully",
  "data": {
    "id": "1",
    "enrollmentStatus": "approved",
    "progress": 0,
    "enrollmentDate": "2024-06-09T22:15:52.654Z",
    "course": {
      "id": "1",
      "title": "Node Js Course",
      "description": "In this course you will learn how to create APIs using Express js and MongoDB",
      "price": 120,
      "language": "English",
      "difficulty": "Easy",
      "duration": 2,
      "durationUnit": "Month",
      "requirements": null,
      "deadline": "2024-12-11T23:00:00.000Z",
      "createdAt": "2024-06-09T20:25:31.811Z",
      "updatedAt": "2024-06-09T20:25:31.811Z"
    },
    "student": {
      "id": "1",
      "biography": null,
      "profilePicture": null,
      "user": {
        "id": "1",
        "email": "<email>",
        "firstName": "Zakarya",
        "lastName": "Meddahi",
        "address": null,
        "role": "student",
        "isActive": true,
        "lastLogging": "2024-06-09T21:20:52.191Z",
        "createdAt": "2024-04-28T13:44:01.045Z",
        "updatedAt": "2024-04-28T13:44:01.045Z"
      }
    }
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## DELETE Cancel Enrollment

DELETE `/api/v1/courses/enrollments/1`

- __Students__ can cancel their enrollments

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Enrollment canceled successfully"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Chat Rooms

## GET Get Chat Room

GET /api/v1/courses/1/chats/1

- **Admin** and **Course Creator** can see course chat
- Enrolled **Students** with accepted status can see chat

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Chat room loaded successfully",
  "data": {
    "id": "1",
    "name": "General",
    "createdAt": "2024-06-09T20:25:31.858Z",
    "updatedAt": "2024-06-09T20:25:31.858Z",
    "courseId": null,
    "roomId": "1"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## GET Get Chat Rooms

GET `/api/v1/courses/1/chats`

- **Admin** and **Course Creator** can see chats in of course
- Enrolled Students with accepted status can see chats

> Response Examples

> 200 Response

```json
{
  "status": "success",
  "message": "Loaded chat rooms successfully",
  "data": [
    {
      "id": "1",
      "name": "General",
      "createdAt": "2024-06-09T20:25:31.858Z",
      "updatedAt": "2024-06-09T20:25:31.858Z"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

## PATCH Update Chat Room

PATCH `/api/v1/courses/courseId/chats`

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
{
  "status": "success",
  "message": "Chat room updated successfully",
  "data": {
    "id": "1",
    "name": "general chat",
    "createdAt": "2024-06-09T20:25:31.858Z",
    "updatedAt": "2024-06-09T22:49:14.188Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# File-Messages

## POST Upload File

POST `/api/v1/courses/1/chats/1/messages`

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

> 201 Response

```json
{
  "status": "success",
  "message": "Message sent successfully",
  "data": {
    "id": "1",
    "sender": {
      "id": "1",
      "email": "<email>",
      "firstName": "Sid Ahmed",
      "lastName": "Abdellali",
      "address": null,
      "role": "teacher",
      "isActive": true,
      "lastLogging": "2024-06-09T10:04:12.973Z",
      "createdAt": "2024-04-01T03:57:30.858Z",
      "updatedAt": "2024-06-09T20:52:57.651Z"
    },
    "chat": {
      "id": 1
    },
    "file": {
      "id": "3",
      "name": "DB-Design",
      "url": "http://res.cloudinary.com/private-school/image/upload/v1711819791/DB-Design.png",
      "type": "image",
      "format": "png",
      "size": 95810,
      "createdAt": "2024-06-09T22:52:19.381Z",
      "updatedAt": "2024-06-09T22:52:19.381Z"
    },
    "content": null,
    "isPinned": false,
    "sentAt": "2024-06-09T22:52:19.420Z",
    "updatedAt": "2024-06-09T22:52:19.420Z"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[CREATED](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

# Social-Accounts

## PATCH Update Social Links

PATCH `/api/v1/social-links/1`

- __All Users__ can update their social link urls

> Body Parameters

```json
{
  "linkedIn": "https://www.linkedin.com/in/zakarya-meddahi"
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
{
  "status": "success",
  "message": "Social links updated successfully",
  "data": {
    "id": "1",
    "linkedIn": "https://www.linkedin.com/in/zakarya-meddahi",
    "facebook": null,
    "twitter": null,
    "github": null,
    "youtube": null,
    "website": null,
    "user": {
        "id": "1"
    }
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

<!-- ### Responses Data Schema -->

<!-- # Data Schema -->

