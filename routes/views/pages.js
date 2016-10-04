var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'pages';

    locals.data = {
        spageitems: []
    };


    // Load the stories
    view.on('init', function(next) {

        var q = keystone.list('Page').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')

        q.exec(function(err, results) {
            locals.data.posts = results;
            next(err);
        });

    });

    // Render the view
    view.render('pages');

};
