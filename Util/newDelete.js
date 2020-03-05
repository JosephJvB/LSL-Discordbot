const roleUpdate = require('./roleUpdate');
const { setWrCache } = require('./wrCache');
const { setPbCache } = require('./pbCache');

module.exports = newDelete;

function newDelete(client) {
    return async (req, res) => {
        if (req.query.auth !== process.env.HerokuAUTH) {
            res.sendStatus(403);
            return;
        }
        try {
            res.sendStatus(200);
            setWrCache();
            setPbCache();
            roleUpdate(client);
        } catch (err) {
            console.log('An error occured in newDelete: '+err);
        }
    }
}