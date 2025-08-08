const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students and Courses API',
        description: 'API for managing student and course information',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);