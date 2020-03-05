let cache;
async function main () {
    const struc = {
        season1: {
            Gravspeed: {},
            Standard: {}
        },
        season2: {
            Gravspeed: {},
            Standard: {}
        },
        season3: {
            Gravspeed: {},
            Standard: {}
        }
    }

    const grav1 = struc.season1.Gravspeed;
    const stan1 = struc.season1.Standard;
    grav1.Hanamura = {};
    grav1.Hanamura.time = Number('0.00');
    grav1.Hanamura.user = 'TERRORWOLF#2829';
    stan1.Hanamura = {};
    stan1.Hanamura.time = Number('1.00');
    stan1.Hanamura.user = 'TERRORWOLF#2829';
    cache = await struc;
    await console.log(cache);
    try {
        if (!cache.season2.Gravspeed.Hanamura || cache.season2.Gravspeed.Hanamura.time < '1.00') console.log('not found!');
    } catch (err) {
        console.log('Not good');
    }
    const season1 = cache.season1;
    const season2 = cache.season2;
    return {
        ...season1,
        oldSeason: season2
    }
}
async function log () {
    //const data = await main();
}
log();
