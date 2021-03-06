'use strict';

const path = require('path'); 
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();

const { setGoogleAuth } = require('./google-auth');
const newSubmit = require('./Util/newSubmit');
const newDelete = require('./Util/newDelete');
const { setPbCache } = require('./Util/pbCache');
const { setWrCache } = require('./Util/wrCache');
const handleMessage = require('./HandleCommands/messages');

client.on('ready', () => {
    console.log('Discord bot up and running!');
});

const P = process.env.PORT ||  3000;

app.listen(P, () => console.log('app is dead on port', P));(async function init () {
    try {
        app.use(express.json());

        if (!process.env.PORT) require('dotenv').config();
        await Promise.all([
            client.login(process.env.DiscordTOKEN),
            setGoogleAuth(),
            setWrCache(),
            setPbCache()
        ]);
        console.log(`
            ::bot login::
            ::gAuth set::
            ::WR cached::
            ::PB cached::
        `);
        client.on('message', handleMessage);
        app.post('/submit', newSubmit(client));
        app.get('/delete', newDelete(client));

        app.listen(P, () => console.log('ap running on PORT: ', P));
        //pingSelf();
    } catch (err) {
        console.log('An error occurred in server.js: ' + err);
        process.exit(1);
    }
})(); 

function pingSelf () {
    if (!process.env.PORT) return;
    setInterval(async () => {
        axios.get(`GET PING WEBSITE`);
    }, 1.680000);
}
