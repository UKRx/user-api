git clone https://github.com/UKRx/user-api.git
cd user-api
Install dependencies:
npm install
Compile the TypeScript code:

npx tsc
Run the application:

node dist/app.js
Usage

The API server runs on http://localhost:3000. You can use Postman or curl to test the endpoints as described below.

API Endpoints

Register Member
Register a new member.

URL: /members/register
Method: POST
Headers:
Content-Type: application/json
Body:

```
{
"email": "test@example.com",
"password": "password123",
"name": "John Doe",
"dateOfBirth": "1990-01-01",
"gender": "male",
"address": "123 Main St",
"subscribeToNewsletter": true
}
```

Get Profile
Retrieve the profile information of the authenticated member.

URL: /members/profile
Method: GET
Headers:
Authorization: Bearer faketoken_user1
Edit Profile
Edit the profile information of the authenticated member.

URL: /members/edit-profile
Method: PUT
Headers:
Authorization: Bearer faketoken_user1
Content-Type: application/json
Body:

```
{
"dateOfBirth": "1991-01-01",
"address": "456 Elm St"
}
```

Delete Account
Delete the authenticated member's account.

URL: /members/delete-account
Method: DELETE
Headers:
Authorization: Bearer faketoken_user1
Change Password
Change the password of the authenticated member.

URL: /auth/change-password
Method: POST
Headers:
Authorization: Bearer faketoken_user1
Content-Type: application/json
Body:

```
{
"currentPassword": "password123",
"newPassword": "newpassword123",
"confirmPassword": "newpassword123"
}

```

Testing the API

You can use Postman or curl to test the endpoints:

Register Member

```
curl -X POST http://localhost:3000/members/register \
 -H "Content-Type: application/json" \
 -d '{"email": "test@example.com", "password": "password123", "name": "John Doe", "dateOfBirth": "1990-01-01", "gender": "male", "address": "123 Main St", "subscribeToNewsletter": true}'
```

Get Profile

```
curl -X GET http://localhost:3000/members/profile \
 -H "Authorization: Bearer faketoken_user1"
```

Edit Profile

```
curl -X PUT http://localhost:3000/members/edit-profile \
 -H "Authorization: Bearer faketoken_user1" \
 -H "Content-Type: application/json" \
 -d '{"dateOfBirth": "1991-01-01", "address": "456 Elm St"}'
```

Delete Account

```
curl -X DELETE http://localhost:3000/members/delete-account \
 -H "Authorization: Bearer faketoken_user1"
```

Change Password

```
curl -X POST http://localhost:3000/auth/change-password \
 -H "Authorization: Bearer faketoken_user1" \
 -H "Content-Type: application/json" \
 -d '{"currentPassword": "password123", "newPassword": "newpassword123", "confirmPassword": "newpassword123"}'
```
