const { getEmojiFromNum, getNumFromEmoji, reactionFilter } = require('./reactionEmj');

modules.exports = getUserReaction;

async function getUserReaction(message, botMsg, opts) {
    const reactOpts = [];
    for (i = 1; i <= opts.length; i++) {
        const emoji = getEmojiFromNum(i);
        reactOpts.push(emoji);
        await botMsg.react(emoji);
    }

    await message.react('❔');
    botMsg.edit('React to select the corresponding map!' + opts.map((o, i) => '```'+reactOpts[i]+' '+o[i]+'```').join(''));
    const userChoice = await botMsg.awaitReactions(reactionFilter(reactOpts, m.author.id), {max: 1, time: 15000});
    const opt = await getNumFromEmoji(userChoice);
    const map = opts[opt - 1];
    if(message.reactions.get('❔')) message.reactions.get('❔').remove();
    botMsg.clearReactions();

    return map;
}
