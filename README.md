# AWS Lambda demo app

AWS Lambda + Firebase Realtime Database

## How to deploy

### Prerequisitions

* Install node_modules using `npm install`

* Install awscli, then do [aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

* Get your Firebase service account key.  
Create Firebase project, go to settings, Service accounts.
Generate a private key and put it under `private/firebase-service-account-key.json`

* Set Firebase DB url as `FIREBASE_DB_URL` env variable.
To acquire Firebase DB url, go to Firebase project console, Database, then choose "Realtime database" and copy the url provided.

### Run locally

To run the server locally, use `npm run start`.  
This will run the server on `http://localhost:3000`.

### First time deploy

To create a new lambda function in a selected region, use the following command:
```
claudia create --handler lambda.handler --deploy-proxy-api --region eu-central-1
```
Where `eu-central-1` is your [selected region](https://docs.aws.amazon.com/general/latest/gr/rande.html).

### Push new code to existing lambda

After you've used `claudia create` and have `claudia.json` file generated, you can use `nmp run deploy`

## API Reference

### Authentication

Get an auth token using Firebase SDK (sample page is located under `/auth/login.html`)  
Send this token with every requests in a header:
```
Authorization: Bearer TOKEN
```

### Tasks
**Create a new task**  
POST `/tasks`  
Body:
```
{
  "title": "Title of a task",
  "description": "Description of a task (optional)"
}
```

**Get a list of your tasks**  
GET `/tasks`

**Get a single task**  
GET `/tasks/:taskId`

**Partial update a task**  
PUT `/tasks/:taskId`  
Body:
```
{
  "title": "Title of a task",
  "description": "Description of a task (optional)",
  "completed": true
}
```

**Delete a task**  
DELETE `/tasks/:taskId`
