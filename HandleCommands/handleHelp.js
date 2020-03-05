module.exports = handleHelp;

async function handleHelp(message) {
    try {
        switch(message.content.toLowerCase()) {
            case '!help':
                message.channel.send('Available bot commands:', {
                    embed: {
                        fields: [{
                            name: '!help',
                            value: 'Shows this command.'
                        },
                        {
                            name: '!help [command]',
                            value: 'Gives detailed information about how to use the command.'
                        },
                        {
                            name: '!version',
                            value: 'Returns the bot version.'
                        },
                        {
                            name: '!submit [season], [mode], [map], [time], [link]',
                            value: 'Submit a new run to the leaderboards.'
                        },
                        {
                            name: '!delete [season], [link]',
                            value: 'Delete a posted record.'
                        },
                        {
                            name: '!wr [season], [mode], [mpa]',
                            value: 'Look up a wordrecord.'
                        },
                        {
                            name: '!pb [season], [mode], [map]',
                            value: 'Look up a personal best.'
                        },
                        {
                            name: 'syntax:',
                            value: 'All parameters of a command MUST be sperated by a comma (,).'
                        }]
                    }
                })
                break;
            case '!help submit':
                message.channel.send('!submit details:', {
                    embed: {
                        fields: [{
                            name: 'Command structure:',
                            value: '!submit [season], [mode], [map], [time], [link]'
                        },
                        {
                            name: '[season]:',
                            value: 'The surf season of the run as a number. ex: 1'
                        },
                        {
                            name: '[mode]',
                            value: 'The mode of the run. opts: grav / standard'
                        },
                        {
                            name: '[map]',
                            value: 'The map of the run. ex: hanamura'
                        },
                        {
                            name: '[time]',
                            value: 'The achieved time as a 2 point decimal. ex: 11.29'
                        },
                        {
                            name: '[link]',
                            value: 'Full link to the recording of the run.'
                        },
                        {
                            name: 'Example of !submit:',
                            value: '!submit 3, grav, hanamura, 9.50, https://gfycat.com/cloudydishwasherfish'
                        }]
                    }
                });
                break;
            case '!help delete':
                message.channel.send('!delete details:', {
                    embed: {
                        fields: [{
                            name: 'Command structure:',
                            value: '!delete [season], [link]'
                        },
                        {
                            name: '[season]',
                            value: 'The surf season as a number. ex: 1',
                        },
                        {
                            name: '[link]',
                            value: 'The link corresponding to the run.'
                        },
                        {
                            name: 'Example of !delete:',
                            value: '!delete 3, https://gfycat.com/cloudydishwasherfish'
                        }]
                    }
                })
                break;
            case '!help wr':
                message.channel.send('!wr details:', {
                    embed: {
                        fields: [{
                            name: 'Commnad structure:',
                            value: '!wr [season], [mode], [map]'
                        },
                        {
                            name: '[season]',
                            value: 'The surf season as a number. ex: 1'
                        },
                        {
                            name: '[mode]',
                            value: 'The mode of the wr. opts: grav / standard'
                        },
                        {
                            name: '[map]',
                            value: 'The map of the wr. ex: hanamura'
                        },
                        {
                            name: 'Example of !wr:',
                            value: '!wr 3, grav, hanamura'
                        }]
                    }
                });
                break;
            case '!help pb':
                message.channel.send('!pb details:', {
                    embed: {
                        title: `new run submitted by ${data.user}`,
                        url: '',
                        color: 3010349,
                        author: {
                            name: 'LSL-discordbot',
                            icon_ulr: '',
                            url: '',
                        },
                        thumbnail: {
                            url: '',
                        },
                        fields: [{
                            name: 'Command structure:',
                            value: '!pb [season], [mode], [map]'
                        },
                        {
                            name: '[season]',
                            value: 'The season of the pb. ex: 1'
                        },
                        {
                            name: '[mode]',
                            value: 'The mode of the pb. opts: grav / standard'
                        },
                        {
                            name: '[map]',
                            value: 'The map of the pb. ex: hanmura'
                        },
                        {
                            name: 'Example of !pb:',
                            value: '!pb 3, grav, hanamura'
                        }],
                        timestamp: new Date(),
                        footer: {
                            text: 'Record posted',
                            icon_url: '',
                        },
                    }
                });
                break;
            default:
                message.channel.send('Requested help for an unknown command. Use !help for an overview of all existing commands.');
                break;
        }
    } catch(err) {
        message.channel.send('❌ An error occurred while handling your command. Informing staff.');
        console.log('Error in handleHelp: ' + err)
    }
}
