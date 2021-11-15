
![Logo](https://raw.githubusercontent.com/pulkitjain708/pollquery/main/pollquery-b/logo.png)


# PollQuery

A project made on MERN to gather inputs from user by sharing forms and later exporting the same data to CSV formats
Could also facilitate querying and generating reports




## Authors

- [@pulkitjain708](https://github.com/pulkitjain708)
- yash 
- deepak


## Installation

Install required dependecies as

```bash
  cd pollquery/pollquery-b
  npm i
  cd pollquery/main
  npm i
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/pulkitjain708/pollquery.git
```

Navigate to server and start

```bash
  cd pollquery/pollquery-b
```

Start the server

```bash
  node server.js
```

Navigate to frontend and start

```bash
  cd pollquery/main
```

Start the server

```bash
  npm run start
  ```


## Some Modules may not work

- to install sass , run npm i node-sass


## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** Mongodb


## Demo
Login
![Login](https://raw.githubusercontent.com/pulkitjain708/pollquery/main/screenshots/login.png)
Dashboard
![](https://github.com/pulkitjain708/pollquery/blob/main/screenshots/dashboard.png?raw=true)
Shared Form 
![](https://github.com/pulkitjain708/pollquery/blob/main/screenshots/shared%20form.png?raw=true)
Mail Templates
![](https://github.com/pulkitjain708/pollquery/blob/main/screenshots/mailTemplate.png?raw=true)
Exported CSV
![](https://github.com/pulkitjain708/pollquery/blob/main/screenshots/exported-csv.png?raw=true)

## API Reference
- Register
- Form Service 
- Login
#### Register

```http
  POST /register/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mail` | `string` | **Required**. Your Mail ID |

This initializes your mail in DB

#### Issue OTP for Registration

```http
  POST /register/verifyToken
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mail` | `string` | **Required**. Your Mail ID |
| `otp` | `string` | **Required**. Your OTP you Recieved |
| `token` | `string` | **Required**. Your token stored locally |

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mail` | `string` | **Required**. Your Mail ID |
| `password` | `string` | **Required**. Your password|

#### Form Service
These routes consume data from Fetch API .
#### add a new form
```http
  POST /FrmSrv/newForm  
```

#### fetch forms for a user
```http
  POST /FrmSrv/fetchByMail  
```

#### Adds a response for User form
```http
  POST /FrmSrv/submitFormResult  
```

#### check if a form belongs to user 
```http
  POST /FrmSrv/formBelongsToUser  
```

#### passes innerHtml to server to send HTML Form Response via Mail
```http
  POST /FrmSrv/submitHTML  
```

#### aggregates and serves a CSV of gathered data
```http
  POST /FrmSrv/getResponses  
```

