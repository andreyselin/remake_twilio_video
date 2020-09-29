const express = require('express');
const path = require('path');
const cors = require('cors');
const AccessToken = require('twilio').jwt.AccessToken;

const app = express();
const VideoGrant = AccessToken.VideoGrant;
const { config } = require("./config");
app.use(cors());

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/token', (req, res) => {
    const { identity, roomName } = req.query;
    const token = new AccessToken(...config.twilioConfig);
    token.identity = identity;
    const videoGrant = new VideoGrant({ room: roomName });
    token.addGrant(videoGrant);
    res.send(token.toJwt());
    console.log(`issued token for ${identity} in room ${roomName}`);
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../../build/index.html')));

app.listen(8081, () => console.log('token server running on 8081'));
