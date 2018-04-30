# backend-microservice
Dockerized version

## Getting Started

Simple backend task for Hackerbay, before making any request please ensure you have PostMan installed. GET POSTMAN [HERE](https://www.getpostman.com/apps).

New to POSTMAN ? SEE [DOCS](https://www.getpostman.com/docs/v6/)

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


### Contacts
Now you've gotten your `jwt token` and must have added it to the `Bearer <token>` Make a `GET` request to `localhost:4000/contacts`, Done? Awesome! this retrieves the pervious added contacts in a `json format`.

With the same header Authorization and Bearer <token> make a `POST` request to `localhost:4000/contacts` to add a new contact. Requet body should look.

```
{
    "name" : "Nazas",
    "tel" : "555-555-555",
    "email" : "interview@hackerbay.io"
}
```

Awesome! we've made fast progress so far. Making a `PUT` and `DELETE` request will require an addition params i.e `/:index` this matches the request to particular index of the array of the `JSON` Data. Your request should be `localhost:4000/contacts/1` this matched our request to the index of `1` if we make a `PUT` a request to that `URL` it updates that portion of the `JSON PATCH`. Try it yourself. This goes with the `DELETE` request to that `URL` or `route` it removes that `index` from the `JSON PATCH`.


### Thumbnail Generator
NB:- _node-thumbnail creates a queue of images and converts them asynchronously into thumbnails. node-thumbnail has no binary dependencies --- only javascript._

Because the route `localhost:4000/thumbnail` you will defintely need to add our <token> to the Authorization Header. Selecting an image should generate a thumbnail. Try doing this in your browser.