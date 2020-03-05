module.exports = getSeasonOptions;

function getSeasonOptions(season) {
    switch(season) {
        case '1': return '1';
        case '2': return '2';
        case '3': return '3';
        default: return;
    }
}