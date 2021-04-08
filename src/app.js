const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlerbars engine and viwes location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Pastiu Bogdan"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Pastiu Bogdan"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "What can we do for you?",
        title: "Help",
        name: "Pastiu Bogdan"
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        // iesim aici daca intram in if ca sa nu punem un else
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help page not found",
        name: "Pastiu Bogdan"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Pastiu Bogdan"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});