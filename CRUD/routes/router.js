const userRoutes = require('./userRoutes/userRoutes')
const url = require('url');


const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;
  
    res.setHeader('Content-Type', 'application/json')

    if (pathname === '/user' || pathname.startsWith('/users')) {
      userRoutes(req, res);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({message: 'Page not found'}));
    }
};


module.exports = requestHandler;