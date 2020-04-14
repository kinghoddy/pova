const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()


        // server.get('/news/:newscat', (req, res) => {
        //     app.render(req, res, '/news/newscat', { newscat: req.params.newscat })
        // })
        // server.get('/news/:newscat/:pid', (req, res) => {
        //     app.render(req, res, '/news/post', { newscat: req.params.newscat, pid: req.params.pid })
        // })
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3002, err => {
            if (err) throw err;
            console.log('Ready on kinghoddy\'s server');

        })

    })

    .catch(err => {
        console.error(err.stack)
        process.exit(1);

    })
