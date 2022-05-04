const convertToMilliseconds = (time) => {
    time = time.split(':');
    return time[0] * 3600000 + time[1] * 60000 + time[2] * 1000 
}

module.exports = convertToMilliseconds;