// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.js');
const MONGO_DB = require('../configs/db.config')

const drones = [ 
    {
        name: "General Atomics MQ-9",
        propellers: 4, 
        maxSpeed: 20
    },
    {
        name: "Sargent Blaster MQ-10",
        propellers: 6, 
        maxSpeed: 30
    },
    {
        name: "Major Trouble MQ-11",
        propellers: 8, 
        maxSpeed: 40
    }
];

Drone.create(drones)
    .then(dronesFromDB => {
        console.log(`Created ${dronesFromDB.length} drones`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating drones from the DB: ${err}`));