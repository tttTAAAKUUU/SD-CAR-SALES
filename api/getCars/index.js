module.exports = async function (context, req) {
    context.log('Getting all cars.');

    // Import cars data
    const cars = require('../shared/cars.json');

    context.res = {
        body: cars
    };
};