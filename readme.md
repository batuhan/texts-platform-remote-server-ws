# Platform Remote WS

This is the server side code of the websocket platform integration for Texts. 
Built with https://github.com/batuhan/texts-platform-remote-server-boilerplate

Client side code at https://github.com/batuhan/texts-platform-remote-ws

## Prerequisites

Before you begin. ensure you have the following installed.

- [Node.js](https://nodejs.org/en)

## How to install

- Clone this repository and navigate into the project directory:
```bash
git clone https://github.com/batuhan/texts-platform-remote-server-ws.git && cd texts-platform-remote-server-ws
```
- Create an .env file with the following for a postgres db
```
DATABASE_URL=
PORT=
```
- Install dependencies and build the project:
```bash
npm install
npm build
```
- Start the server
```bash
npm start
```

## How It Works

This implementation aims to connect into another ws server and send any messages coming through that ws to a Texts thread.

To achieve this, it recieves a websocket url from client side which it connects to. Then it sends any data as a message to an existing read-only thread called Websocket Server.

## Credits

This integration was built at [Pickled Works](https://pickled.works/) by [@alperdegre](https://github.com/alperdegre/) and it isn't an official integration by Texts.
