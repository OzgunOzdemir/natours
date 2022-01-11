const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

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

app.get("/api/v1/tours/:id", (req, res) => {

  const id = req.params.id * 1;
  const tour =  tours.find((item => item.id === id))

  if(!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {

  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: '<Updated tour here...>'
    }
  })
})

app.delete("/api/v1/tours/:id", (req, res) => {

  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(204).json({
    status: "success",
    data: null
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
