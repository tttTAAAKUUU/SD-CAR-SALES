const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
    //context.log('Deleting car by ID.');

    if (req.method === 'delete') {

        //const id = req.url.substring(10); // Extract ID from URL
        const id= req.params.carId

        // Import cars data
        const carsFilePath = path.resolve(__dirname, '../shared/cars.json');
        let cars = require(carsFilePath);

        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars.splice(index, 1);

            // Write updated data back to the JSON file
            fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));

            // context.res = {
            //     status: 200,
            //     body: { message: `Car with id ${id} deleted` }
            // };

            context.res = {
                body: cars
            };
        } else {
            context.res = {
                status: 404,
                body: "Car not found"
            };
        }
    } else {
        context.res = {
            status: 400,
            body: "Invalid request. Please use DELETE method with /api/cars/{id} endpoint."
        };
    }
};
