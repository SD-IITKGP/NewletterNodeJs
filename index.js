const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const data = {
    members: [
      {
        email_address: req.body.email,
        status: "subscribed",
        merge_fields: {
          FNAME: req.body.fullName,
          LNAME: " ",
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  const url = "https://us9.api.mailchimp.com/3.0/lists/2daac7e427";
  const options = {
    method: "POST",
    auth: "jaihindsourabh@gmail.com:4c044051d68f31dcf6b3b102d887618a-us9",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/faliure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/faliure", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.listen(3000, function () {
  console.log("server running at port 3000");
});