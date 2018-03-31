import express from 'express'
import mongoose from 'mongoose'
import shortid from 'shortid'
import config from './config'
import UrlModel from './models/shortUrl'

const app = express()
const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i
const securityRegex = /^(http|https):\/\//i

mongoose.connect(config.db)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'lil-link'
    })
})

app.get('/new/:urlToShorten(*)', (req, res) => {
    const { urlToShorten } = req.params
    const data = regex.test(urlToShorten)
        ? new UrlModel({
            originalUrl: urlToShorten,
            newUrl: shortid.generate()
        })
        : null
    
    data
        ? data.save((err, product) => {
            const { originalUrl, newUrl, createdAt } = product

            err && res.json(err)
            product && res.json({
                originalUrl,
                newUrl,
                createdAt
            })
        })
        : res.json({ error: `${urlToShorten} is not a valid Url` })
})

app.get('/find', (req, res) => {
    UrlModel.find()
        .then(doc => {
            res.json(doc)
        })
})

app.get('/:urlToForward', (req, res) => {
    const { urlToForward } = req.params

    UrlModel.findOne({
        newUrl: urlToForward
    }, (err, data) => {
        err && res.json(err)
        data
            ? res.redirect(
                301,
                securityRegex.test(data.originalUrl)
                    ? data.originalUrl
                    : `http://${data.originalUrl}`
            )
            : res.json({ error: 'That Url doesn\'t exist!' })
    })
})

app.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port)
})
