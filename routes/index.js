const staticeRoute = require('./StaticRouter/static.route');
const urlRoute = require('./UrlRouter/url.route');

module.exports = {
    urlRouter: urlRoute,
    staticeRouter: staticeRoute,
}