const express = require("express");
const app = express();
const port = 3000;
const os = require("os");

const hostname = os.hostname();
const numberOfLicences = 2;
let licenseNumber = 1;

process.on("SIGINT", function () {
    console.log("CLOSING [SIGINT]");
    process.exit();
});
process.on("SIGTERM", function () {
    console.log("CLOSING [SIGTERM]");
    process.exit();
});

app.get("/checkout", (req, res) => {
    if (licenseNumber > numberOfLicences) {
        res.send(`${hostname}: No more licenses are available!\n`);
        return;
    }
    res.send(`${hostname}: License number ${licenseNumber}\n`);
    licenseNumber = licenseNumber + 1;
});

app.get("/checkin", (req, res) => {
    res.send(`${hostname}: Done!\n`);
    licenseNumber = licenseNumber - 1;
});

app.get("/health", (req, res) => {
    if (licenseNumber >= numberOfLicences) {
        res.status(500).end()
        return;
    }
    res.status(200).end();
});

app.listen(port, () =>
  console.log(`FlexML running on http://localhost:${port}`)
);
