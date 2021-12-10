const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const fs = require('fs');

app.use(express.static(`${__dirname}/dist`));

app.use('/', router);

router.get('*', (req, res, next) => {
  // uncomment the line below to see the file requests on the console

  if (fs.existsSync(`${__dirname}` + req.url+ '.gz')){
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    req.url = req.url + '.gz';
  }
  res.sendFile(`${__dirname}` + req.url);
});

app.listen(port);
console.log('App listenning on port', port);