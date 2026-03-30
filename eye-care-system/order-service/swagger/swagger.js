const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'order-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for order-service',
        },
        servers: [{ url: 'http://localhost:8006' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
