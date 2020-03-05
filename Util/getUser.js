module.exports = getUser;

async function getUser(client, user) {
    const guilds = await client.guilds.get(process.env.DiscordGUILD);
    const members = await guilds.fetchMembers(user, 10);
    const mention = await members.find(u => u.tag === user);
    if (!mention) return user.split('#')[0]; 
    else return mention;
}