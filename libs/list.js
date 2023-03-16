const IsValueInList = (list, value) => {
    for (let i = 0; i < list.length; i++) {
        if (value == list[i]) return true;
    }
    return false;
}

module.exports = { IsValueInList }