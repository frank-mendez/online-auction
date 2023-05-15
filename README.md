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

`API_KEY`

`ANOTHER_API_KEY`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
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
