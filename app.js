const express = require("express");
const fs = require("fs");

const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "hello from the server side!",
//     app: "Natours",
//   });
// });

// app.post("/", (req, res) => {
//     res.send("You can post this endpoint...")
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
