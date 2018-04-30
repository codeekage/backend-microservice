# backend-microservice
Dockerized version

## Getting Started

Simple backend task for Hackerbay, before making any request please ensure you have PostMan installed. GET POSTMAN HERE [https://].

New to POSTMAN ? Simple POSTMAN Tutorials HERE

### Table of contact

* Login
* Contact Patch
* Thumbnail Generator

### Login
To get started with the login service make a request to `localhost:4000/login` this is the public route from running docker.

Make sure that the Request Body contians `username` and `password`. Should look this way
```
    {
        "username" : "Username",
        "password" : "Password"
    }
```
The request returns a `jwt token` that must be added to the Header to access Procted Routes. See Adding Bearer Token HERE

Awesome! you just got your `jwt token` and you can proceed to procted routes like `/contacts` and `/thumbnail`.
