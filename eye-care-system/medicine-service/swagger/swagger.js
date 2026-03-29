const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'medicine-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for medicine-service',
        },
        servers: [{ url: 'http://localhost:8004' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
