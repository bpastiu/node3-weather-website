const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnBhc3RpdSIsImEiOiJja21penZmeTUwbWNiMnBxbzhsNWVjbnUxIn0.H-ZMHGq729db-rzLhZPvAA&limit=2`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.features.length === 0) {
            callback("Location not found.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[1].center[1],
                longitude: body.features[1].center[0],
                location: body.features[1].place_name
            })
        }
    })
}

module.exports = geocode