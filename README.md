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

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

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
