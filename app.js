import express from 'express'
import Limiter from 'express-rate-limiter'
import MemoryStore from 'express-rate-limiter/lib/memoryStore'
import mongoose from 'mongoose'
import shortid from 'shortid'
import config, { emojiMap, regex } from './config'
import UrlModel from './models/shortUrl'

const app = express()
const limiter = new Limiter({ db : new MemoryStore() })

process.setMaxListeners(0)
mongoose.connect(config.db)
app.set('view engine', 'ejs')
app.use(express.static('public'))

const submitUrl = (url, res) => {
    let data = null

    if (regex.url.test(url)) {
        const newUrl = shortid.generate()

        data = new UrlModel({
            originalUrl: url,
            newUrl,
            emojiUrl: emojiMap.mapString(newUrl)
        })
    }

    data
        ? data.save((err, product) => {
            err && res.json(err)

            const { originalUrl, newUrl, emojiUrl, createdAt, _id } = product

            product && res.json({
                originalUrl,
                newUrl,
                emojiUrl,
                createdAt,
                deleteUrl: `delete/${_id}/${newUrl}`
            })
        })
        : res.json({ error: `'${url}' is not a valid Url.` })
}

app.get('/', (req, res) => {
    const { url } = req.query

    if (url) {
        submitUrl(url, res)
    } else {
        res.render('index', {
            origin: `${req.protocol}://${req.get('host')}`
        })
    }
})

app.get(`/${encodeURI('🔮')}`, (req, res) => {
    res.json({ h4x: '🔮' })
})

app.get('/new/:urlToShorten(*)', limiter.middleware(), (req, res) => {
    const { urlToShorten } = req.params

    submitUrl(urlToShorten, res)
})

app.get('/all', (req, res) => {
    UrlModel.find()
        .then(data => { res.json(data) })
        .catch(error => { res.json(error) })
})

app.get('/delete/all', (req, res) => {
    UrlModel.remove()
        .then(({ n, ok }) => {
            res.json(
                ok
                    ? { success: `Deleted ${n} entries.` }
                    : { error: 'Failed to delete data.' }
            )
        })
        .catch(error => res.json(error))
})

app.get('/delete/:_id/:newUrl', (req, res) => {
    const { _id, newUrl } = req.params

    UrlModel.findOneAndRemove({ _id, newUrl }, (err, doc) => {
        if (err) {
            res.json({ error: err })
        } else if (doc) {
            res.json({ success: `Link ${doc.newUrl} deleted.`})
        } else {
            res.json({ error: 'Failed.' })
        }
    })
})

app.get('/:urlToForward(*)', (req, res) => {
    const { urlToForward } = req.params

    if (regex.shortUrl.test(urlToForward)) {
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
    } else if (regex.emoji.test(urlToForward)) {
        UrlModel.findOne({
            emojiUrl: urlToForward
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
    } else {
        res.redirect(301, `${req.protocol}://${req.get('host')}`)
    }
})

app.listen(config.port, () => {
    console.info('Express listening on port', config.port)
})
