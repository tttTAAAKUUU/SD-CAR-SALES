const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
    context.log('Adding car.');

    // Check if request body contains car data
    if (req.body) {
        // Import cars data
        const carsFilePath = path.join(__dirname, '../shared/cars.json');
        let cars = [];
        try {
            cars = require(carsFilePath);
        } catch (error) {
            context.log.error('Error reading cars data:', error);
            context.res = {
                status: 500,
                body: 'Internal Server Error'
            };
            return;
        }

        // Add the new car to the cars array
        cars.push(req.body);

        // Write updated cars data back to the JSON file
        try {
            fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 4));
        } catch (error) {
            context.log.error('Error writing cars data:', error);
            context.res = {
                status: 500,
                body: 'Internal Server Error'
            };
            return;
        }

        context.res = {
            status: 201, // 201 Created
            body: 'Car added successfully'
        };
    } else {
        // Original logic for HTTP trigger function
       
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    }
};
