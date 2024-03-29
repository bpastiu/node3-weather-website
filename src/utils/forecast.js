const request = require("request");



const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7914d03353ed5cc1a1c0e2ffb074cb5b&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Air humidity level is ${body.current.humidity}.`);
        }
    })
}

module.exports = forecast