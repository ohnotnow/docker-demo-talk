const express = require("express");
const app = express();
const port = 3000;
const numberOfLicences = 5;

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
        res.send('No more licenses are available!');
        return;
    }
    res.send(`License number ${licenseNumber}`);
    licenseNumber = licenseNumber + 1;
});

app.get("/checkin", (req, res) => {
    res.send(`Done!`);
    licenseNumber = licenseNumber - 1;
});

app.get("/health", (req, res) => {
    const randomError = Math.floor(Math.random() * 10);
    if (randomError == 5) {
        res.status(500).end()
        return;
    }
    res.status(200).end();
});

app.listen(port, () =>
  console.log(`FlexML running on http://localhost:${port}`)
);
