const sendSubmit = require('./sendSubmit');
const sendWR = require('./sendWR');
const roleUpdate = require('./roleUpdate');
const { getWRCache, updateWrCache }  = require('./wrCache');
const { getPbCache, updatePbCache } = require('./pbCache');

module.exports = newSubmit;

function newSubmit(discord) {
    return async (req, res) => {
        if (req.query.auth !== process.env.HerokuAUTH) {
            res.sendStatus(403);
            return;
        }
        try {
            await sendSubmit(discord, req.body);
            res.sendStatus(200);
            await roleUpdate(discord);
            wrCache = await getWRCache();
            pbCache = await getPbCache();
            if (!wrCache[req.body.season][req.body.mode][req.body.map] || Number(req.body.time) < Number(wrCache[req.body.season][req.body.mode][req.body.map]['time'])) {
                console.log(`New Record: ${req.body.season}, ${req.body.mode}, ${req.body.map}, ${req.body.time}, ${req.body.link}`);
                data = await getOldWrData(wrCache, req.body);
                await sendWR(discord, data);
                await updateWrCache(req.body);
            }
            if (!pbCache[req.body.season][req.body.mode][req.body.map] || !pbCache[req.body.season][req.body.mode][req.body.map][req.body.user] || Number(req.body.time) < Number(pbCache[req.body.season][req.body.mode][req.body.map][req.body.user]['time'])) {
                await updatePbCache(req.body);
            }
        } catch (err) {
            console.log('An error occurred in newSubmit: ' + err);
            res.sendStatus(500);
        }
    }
}

async function getOldWrData (cache, newRecord) {
    const oldWr = cache[newRecord.season][newRecord.mode][newRecord.map];
    if (!oldWr) {
        return {
            ...newRecord,
            oldTime: oldWr.time,
            oldUser: oldWr.user,
            oldDate: oldWr.date
        }
    } else {
        return {
            ...newRecord,
            oldTime: 'None',
            oldUser: 'None',
            oldDate: 'None'
        }
    }
}
