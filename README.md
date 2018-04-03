# lil-link-69 🔮
A simple Url shortener powered by the ***[MERN](http://mern.oi/)*** stack. (lil-link was taken...)

Built by **[Eddie Tindame](http://eddietindame.github.io/)** 💻 (from scratch, no boilerplate).

Try it out: **https://lil-link-69.herokuapp.com/**

## **api**
This microservice can also be consumed as a RESTful API:
```
$ curl http://lil-link-69.herokuapp.com/new/myUrlToBeShortened.net
```
Example response:
```
{
    "originalUrl": "myUrlToBeShortened.net",
    "newUrl": "ryWYaQkoM",
    "emojiUrl": "🎩🌵🚗🔫💩🍆💅💁🔥"
    "createdAt": "2018-03-31T22:16:04.367Z",
    "deleteUrl": "delete/5ac150dfd2269d141342fd4d/ryWYZQkoM"
}
```
Requests are limited per IP and all links expire after 24 hours.
