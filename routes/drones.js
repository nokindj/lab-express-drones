const express = require('express');
const Drone = require('../models/Drone');

// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((allTheDronesFromDB) => {
    res.render("drones/list", {drones: allTheDronesFromDB});
  })
  .catch((err) => {
    res.render("error", {err});
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  let {name, propeller, maxSpeed} = req.body;
  Drone.create({
    name, 
    propeller, 
    maxSpeed
  }).then(() => {
    res.redirect("/drones")
  }).catch((err) => {
    res.render("error", {err});
  })
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.droneId;
  Drone.findById(droneId)
  .then((theDroneFound) => {
    res.render("drones/update-form", {drone: theDroneFound});
  })
  .catch((err) => {
    res.render("error", {err});
  })
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.droneId;
  let {name, propeller, maxSpeed} = req.body;
  Drone.findByIdAndUpdate(droneId, {
    name,
    propeller, 
    maxSpeed
  }).then(() => {
    res.redirect("/drones")
  })
  .catch((err) => {
    res.render("error", {err});
  })
});

router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let droneId = req.params.droneId;
  Drone.findByIdAndDelete(droneId)
  .then(() => {
    res.redirect("/drones")
  })
  .catch((err) => {
    res.render("error", {err});
  })
});

module.exports = router;
