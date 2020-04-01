const fetch = require("node-fetch");
const fs = require("fs");

exports.home = (req, res, next) => {
  data = { country: "Poland", invected: 15, dead: 120 };
  res.render("index", { title: "Covid-19 Chart", data: data });
};

exports.getData = (req, res, next) => {
  let country = req.query.country;

  fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(data => data.json())
    .then(body => res.json(body[country]));
};

exports.updateCountries = (req, res, next) => {
  let countries = JSON.parse(fs.readFileSync("countries.json"));
  res.json(countries);
};
