'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRateLimiter = require('express-rate-limiter');

var _expressRateLimiter2 = _interopRequireDefault(_expressRateLimiter);

var _memoryStore = require('express-rate-limiter/lib/memoryStore');

var _memoryStore2 = _interopRequireDefault(_memoryStore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _shortUrl = require('./models/shortUrl');

var _shortUrl2 = _interopRequireDefault(_shortUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var limiter = new _expressRateLimiter2.default({ db: new _memoryStore2.default() });

process.setMaxListeners(0);
_mongoose2.default.connect(_config2.default.db);
app.set('view engine', 'ejs');
app.use(_express2.default.static('public'));

var submitUrl = function submitUrl(url, res) {
    var data = null;

    if (_config.regex.url.test(url)) {
        var newUrl = _shortid2.default.generate();

        data = new _shortUrl2.default({
            originalUrl: url,
            newUrl: newUrl,
            emojiUrl: _config.emojiMap.mapString(newUrl)
        });
    }

    data ? data.save(function (err, product) {
        err && res.json(err);

        var originalUrl = product.originalUrl,
            newUrl = product.newUrl,
            emojiUrl = product.emojiUrl,
            createdAt = product.createdAt,
            _id = product._id;


        product && res.json({
            originalUrl: originalUrl,
            newUrl: newUrl,
            emojiUrl: emojiUrl,
            createdAt: createdAt,
            deleteUrl: 'delete/' + _id + '/' + newUrl
        });
    }) : res.json({ error: '\'' + url + '\' is not a valid Url.' });
};

app.get('/', function (req, res) {
    var url = req.query.url;


    if (url) {
        submitUrl(url, res);
    } else {
        res.render('index', {
            origin: req.protocol + '://' + req.get('host')
        });
    }
});

app.get('/' + encodeURI('🔮'), function (req, res) {
    res.json({ h4x: '🔮' });
});

app.get('/new/:urlToShorten(*)', limiter.middleware(), function (req, res) {
    var urlToShorten = req.params.urlToShorten;


    submitUrl(urlToShorten, res);
});

app.get('/all', function (req, res) {
    _shortUrl2.default.find().then(function (data) {
        res.json(data);
    }).catch(function (error) {
        res.json(error);
    });
});

app.get('/delete/all', function (req, res) {
    _shortUrl2.default.remove().then(function (_ref) {
        var n = _ref.n,
            ok = _ref.ok;

        res.json(ok ? { success: 'Deleted ' + n + ' entries.' } : { error: 'Failed to delete data.' });
    }).catch(function (error) {
        return res.json(error);
    });
});

app.get('/delete/:_id/:newUrl', function (req, res) {
    var _req$params = req.params,
        _id = _req$params._id,
        newUrl = _req$params.newUrl;


    _shortUrl2.default.findOneAndRemove({ _id: _id, newUrl: newUrl }, function (err, doc) {
        if (err) {
            res.json({ error: err });
        } else if (doc) {
            res.json({ success: 'Link ' + doc.newUrl + ' deleted.' });
        } else {
            res.json({ error: 'Failed.' });
        }
    });
});

app.get('/:urlToForward(*)', function (req, res) {
    var urlToForward = req.params.urlToForward;


    if (_config.regex.shortUrl.test(urlToForward)) {
        _shortUrl2.default.findOne({
            newUrl: urlToForward
        }, function (err, data) {
            err && res.json(err);
            data ? res.redirect(301, _config.regex.protocol.test(data.originalUrl) ? data.originalUrl : 'http://' + data.originalUrl) : res.json({ error: 'That Url doesn\'t exist! It may have expired.' });
        });
    } else if (_config.regex.emoji.test(urlToForward)) {
        _shortUrl2.default.findOne({
            emojiUrl: urlToForward
        }, function (err, data) {
            err && res.json(err);
            data ? res.redirect(301, _config.regex.protocol.test(data.originalUrl) ? data.originalUrl : 'http://' + data.originalUrl) : res.json({ error: 'That Url doesn\'t exist! It may have expired.' });
        });
    } else {
        res.redirect(301, req.protocol + '://' + req.get('host'));
    }
});

app.listen(_config2.default.port, function () {
    console.info('Express listening on port', _config2.default.port);
});
