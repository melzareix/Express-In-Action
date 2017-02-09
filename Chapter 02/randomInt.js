function randInt(mx) {
    return Math.floor(Math.random() * mx);
}

module.exports = {
    randomInt: randInt(15),
    randomIntCustom: function (x) {
        return randInt(x)
    }
};