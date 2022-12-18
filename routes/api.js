const express = require('express');
const router = express.Router();
const https = require('https');
const useragent = require('express-useragent');
router.use(useragent.express());

//endpoint to fetch information from github repositories
router.get('/github/repoinfo', function (req, res) {
    const options = {
        hostname: 'api.github.com',
        path: '/users/Yannick-M243/repos',
        headers: {
            'User-Agent': req.useragent
        },
        OAUth: process.env.GITHUB_API_TOKEN
    };
    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
});


module.exports = router;