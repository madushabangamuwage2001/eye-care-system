const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'user-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for user-service',
        },
        servers: [{ url: 'http://localhost:8001' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
