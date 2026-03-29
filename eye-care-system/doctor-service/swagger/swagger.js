const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'doctor-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for doctor-service',
        },
        servers: [{ url: 'http://localhost:8002' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
