const Tour = require("./../models/tourModel");
const APIFeatures = require("../utils/apifeatures");
const catchAsync = require("./../utils/catchAsync");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
}

exports.getAllTours = catchAsync(async (req, res, next) => {
   // EXECUTE QUERY
   const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
   const tours = await features.query;

   // SEND RESPONSE
   res.status(200).json({
     status: "success",
     result: tours.length,
     data: {
       tours,
     },
   });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
