class NewsController {
    index(req, res) {
        res.render('newws');
    }

    show(req, res) {
        res.send('hello');
    }
}

module.exports = new NewsController()