const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'spectacles-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for spectacles-service',
        },
        servers: [{ url: 'http://localhost:8003' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
