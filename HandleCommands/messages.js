const handleHelp = require('./handleHelp');
const handleSubmit = require('./handleSubmit');
const handleDelete = require('./handleDelete');
const handleWr = require('./handleWr');
const handlePb = require('./handlePb');

modules.exports = handleMessage;

async function handleMessage(message) {
    try {
        if(message.content.startsWith('!') && !message.author.bot) {
            if(message.channel.id !== process.env.botCHANNEL) message.channel.send(`Please post commands in <#${process.env.botCHANNEL}>.`)
            return;
        }
        const command = message.content.split(' ')[0].toLowerCase();
        switch(command) {
            case '!submit':
                handleSubmit(message);
                break;
            case '!delete':
                handleDelete(message);
                break;
            case '!wr':
                handleWr(message);
                break;
            case '!pb':
                handlePb(message);
                break;
            case '!help':
                handleHelp(message);
                break;
            default:
                message.channel.send('Unknown command. use \'!help\' for an overview of this bots available commands.')
                return;
        }
    } catch(e) {
        console.error('Error at handleMessage: ' + e);
        message.channel.send('❌ An error occurred while handling your command. Informing staff.');
    }
}
