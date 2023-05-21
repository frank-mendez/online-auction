# Online Auction System

An online auction system where users can create and bid on items.

## Features

- Authentication
  - A user can register and use that to login.
- Deposit money
- Create a new item (name, started price and time window) in the draft state.
  - An item need to be published to start an auction.
- Get the list of completed/ongoing bid items
- Can bid in each 5s and for published items (each user).
  - A new bid has to have a higher price than the current highest bid and started price.

## Authors

- [@frankmendez](https://github.com/frank-mendez)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Go to the `Backend` directory and add `.env` file

```bash
  cd backend
```

`APP_PORT=4000`

`MONGODB_URL=mongodb+srv://admin:NrdI7YSla9NycalH@cluster0.hawbf2o.mongodb.net/`

`MONGODB_NAME=OnlineAuction`

`JWT_SECRET=78a59991-02e4-4b20-8dad-98dd21086ad4`

## Run Locally

Clone the project

```bash
  git clone git@github.com:frank-mendez/online-auction.git
```

Go to the project directory

```bash
  cd online-auction
```

Go to the `Backend` directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## API Reference

### Register User

```http
  POST /users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Unique email  |
| `password` | `string` | **Required**. Your password |

#### Body

```javascript
{
    "email": "test@gmail.com",
    "password": "NrdI7YSla9NycalH!"
}
```

#### Return

```javascript
{
    "email": "test@gmail.com",
    "_id": "646a268eb8403b240a721a67",
    "createdAt": "2023-05-21T14:11:26.731Z",
    "updatedAt": "2023-05-21T14:11:26.731Z",
    "__v": 0
}
```

### Login User

```http
  POST /auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Unique email  |
| `password` | `string` | **Required**. Your password |

#### Body

```javascript
{
    "email": "test@gmail.com",
    "password": "NrdI7YSla9NycalH!"
}
```

#### Return

```javascript
{
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI2NDZhMjY4ZWI4NDAzYjI0MGE3MjFhNjciLCJpYXQiOjE2ODQ2Nzg0OTEsImV4cCI6MTY4NDc2NDg5MX0.l321adVHdAQZSgQ8z3EMoljWci8FZBAS78ry_ikF6ME",
        "email": "test@gmail.com",
        "id": "646a268eb8403b240a721a67"
    }
}
```

### Deposit User

```http
  POST /users/deposit
```

| Header Authorization | Type     | Description       |
| :------------------- | :------- | :---------------- |
| `Bearer Token`       | `string` | **Required**. JWT |

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. User ID                  |
| `deposit` | `number` | **Required**. Can have up to 2 decimal |

### Create Bid Item

```http
  POST /item/create
```

| Header Authorization | Type     | Description       |
| :------------------- | :------- | :---------------- |
| `Bearer Token`       | `string` | **Required**. JWT |

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `name`       | `string` | **Required**. Name of item             |
| `startPrice` | `number` | **Required**. Can have up to 2 decimal |
| `duration`   | `string` | **Required**. e.g 1h                   |
| `author`     | `string` | **Required**. User ID                  |

### Get User Items

```http
  GET /item/{id}
```

| Header Authorization | Type     | Description       |
| :------------------- | :------- | :---------------- |
| `Bearer Token`       | `string` | **Required**. JWT |

### Get All Items

```http
  GET /item
```

| Header Authorization | Type     | Description       |
| :------------------- | :------- | :---------------- |
| `Bearer Token`       | `string` | **Required**. JWT |

### Bid Items

```http
  POST /item
```

| Header Authorization | Type     | Description       |
| :------------------- | :------- | :---------------- |
| `Bearer Token`       | `string` | **Required**. JWT |

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `itemId`   | `string` | **Required**. Item ID                  |
| `bidPrice` | `number` | **Required**. Can have up to 2 decimal |
| `bidderId` | `string` | **Required**. User ID                  |

## Running Tests

To run tests, run the following command

Go to the `Backend` directory

```bash
  cd backend
```

```bash
  npm run test:watch
```

See to the `Backend` test coverage

```bash
  npm run test:cov
```

## Demo

Insert gif or link to demo

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
	return <Component />
}
```
