import express from 'express'
import Limiter from 'express-rate-limiter'
import MemoryStore from 'express-rate-limiter/lib/memoryStore'
import mongoose from 'mongoose'
import shortid from 'shortid'
import config, { regex } from './config'
import UrlModel from './models/shortUrl'

const app = express()
const limiter = new Limiter({ db : new MemoryStore() })

process.setMaxListeners(0)
mongoose.connect(config.db)
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'lil-link',
        host: req.get('host')
    })
})

app.get('/new/:urlToShorten(*)', limiter.middleware(), (req, res) => {
    const { urlToShorten } = req.params
    const data = regex.url.test(urlToShorten)
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
        : res.json({ error: `'${urlToShorten}' is not a valid Url` })
})

app.get('/find', (req, res) => {
    UrlModel.find()
        .then(data => { res.json(data) })
        .catch(error => { res.json(error) })
})

app.get('/delete', (req, res) => {
    UrlModel.remove()
        .then(({ n, ok }) => {
            res.json(
                ok
                    ? { success: `Deleted ${n} entries` }
                    : { error: 'Failed to delete data' }
            )
        })
        .catch(error => res.json(error))
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
                regex.protocol.test(data.originalUrl)
                    ? data.originalUrl
                    : `http://${data.originalUrl}`
            )
            : res.json({ error: 'That Url doesn\'t exist! It may have expired.' })
    })
})

app.listen(config.port, () => {
    console.info('Express listening on port', config.port)
})
