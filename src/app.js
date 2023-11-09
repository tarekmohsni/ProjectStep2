const express = require('express');
const app = express();
const PORT = 3000;

// import application routes
const router = require('./Interfaces/Cli/fleetRoutes');
// Add middleware to process JSON data
app.use(express.json());
// Use application's routes
app.use('/api', router);

app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

module.exports = app;
