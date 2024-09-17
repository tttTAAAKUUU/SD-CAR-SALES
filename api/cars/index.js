module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Import cars data
    const cars = require('/src/cars.json');

    var cors = require("cors")
    app.use(cors())

    // Handle GET request for /cars
    if (req.method === 'GET' && req.url === './api/cars') {
        context.res = {
            status: 200,
            body: cars
        };
    }

    // Handle GET request for /cars/:id
    else if (req.method === 'GET' && req.url.startsWith('./api/cars/')) {
        const id = req.url.substring(10); // Extract ID from URL
        const car = cars.find(car => car.id === id);
        if (car) {
            context.res = {
                status: 200,
                body: car
            };
        } else {
            context.res = {
                status: 404,
                body: "Car not found"
            };
        }
    }

    // Handle PUT request for /cars/:id
    else if (req.method === 'PUT' && req.url.startsWith('./api/cars/')) {
        const id = req.url.substring(10); // Extract ID from URL
        const updatedCar = req.body;
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars[index] = updatedCar;
            context.res = {
                status: 200,
                body: updatedCar
            };
        } else {
            context.res = {
                status: 404,
                body: "Car not found"
            };
        }
    }

    // Handle DELETE request for /cars/:id
    else if (req.method === 'DELETE' && req.url.startsWith('/api/cars/{id}')) {
        const id = req.url.substring(10); // Extract ID from URL
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars.splice(index, 1);
            context.res = {
                status: 200,
                body: { message: `Car with id ${id} deleted` }
            };
        } else {
            context.res = {
                status: 404,
                body: "Car not found"
            };
        }
    }

    // Handle POST request for /cars
    else if (req.method === 'POST' && req.url === './api/cars') {
        const newCar = req.body;
        cars.push(newCar);
        context.res = {
            status: 201,
            body: newCar
        };
    }

    // Handle unsupported requests
    else {
        context.res = {
            status: 405,
            body: "Method not allowed"
        };
    }
};
