# use_mongodb
Deploy a MongoDB application for CS 532 assignment #4. Refer to the provided [template](https://github.com/bilhamil/CS382-Podman-Example)

## Link
- https://dsookhoo.cs382.net

## Routes
- **/**
  - Home Page, index.html
- **/upload**
  - Submit the form
- **/list**
  - List all people in database
- **/query**
  - Query by name, age, date, or city
  - All parameters are optional. Returns all if none are provided
  - Returns each document that matches all parameters exactly.

## How to Serve
1. Connect to the NMSU network via VPN or be physcially on campus
2. `$ ssh dsookhoo@cs382.net`
3. Reset DNS
    - `$ podman-compose down`
    - `$ kill -9 "$(cat /run/user/"$(id -u)"/containers/networks/aardvark-dns/aardvark.pid)"`
    - `$ rm /run/user/"$(id -u)"/containers/networks/aardvark-dns/*`
4. `$ podman-compose build`
5. `$ podman-compose up`

## Notes
#### MongoDB Compass
1. Server name: (doesn't matter). e.g. test1
2. Database Name: myDatabase
3. Collection: 'people'
