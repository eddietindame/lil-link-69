# lil-link-69 🔮
A simple Url shortener powered by the ***[MERN](http://mern.oi/)*** stack.

Built by **[Eddie Tindame](http://eddietindame.github.io/)** 💻 (from scratch, no boilerplate).

## **api**
This microservice can also be consumed as a RESTful API:
```
$ curl http://lil-link-69.herokuapp.com/new/myUrlToBeShortened.net
```
Example response:
```
{
    "originalUrl": "myUrlToBeShortened.net",
    "newUrl": "BJ3suta5G",
    "createdAt": "2018-03-31T22:16:04.367Z",
    "deleteUrl": "delete/5ac150dfd2269d141342fd4d/BJ3suta5G"
}
```
Requests are limited to prevent DOS and all links expire after 24 hours.

## **to-do**
- Stop using babel-node in production
- Fix dynamix protocol
- Tidy up code
