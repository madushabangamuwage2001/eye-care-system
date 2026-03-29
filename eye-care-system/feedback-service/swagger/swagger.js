const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'feedback-service API',
            version: '1.0.0',
            description: 'CRUD API documentation for feedback-service',
        },
        servers: [{ url: 'http://localhost:8005' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
