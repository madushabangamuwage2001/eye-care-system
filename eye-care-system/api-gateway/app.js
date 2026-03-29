require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());


app.use('/api/users', createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true,
    pathRewrite: { '^/api/users': '/users' }
}));

app.use('/docs/user-service', createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true,
    pathRewrite: { '^/docs/user-service': '/api-docs' }
}));

app.use('/api/doctors', createProxyMiddleware({
    target: 'http://localhost:8002',
    changeOrigin: true,
    pathRewrite: { '^/api/doctors': '/appointments' }
}));

app.use('/docs/doctor-service', createProxyMiddleware({
    target: 'http://localhost:8002',
    changeOrigin: true,
    pathRewrite: { '^/docs/doctor-service': '/api-docs' }
}));

app.use('/api/spectacles', createProxyMiddleware({
    target: 'http://localhost:8003',
    changeOrigin: true,
    pathRewrite: { '^/api/spectacles': '/spectacles' }
}));

app.use('/api/repairs', createProxyMiddleware({
    target: 'http://localhost:8003',
    changeOrigin: true,
    pathRewrite: { '^/api/repairs': '/repairs' }
}));

app.use('/docs/spectacles-service', createProxyMiddleware({
    target: 'http://localhost:8003',
    changeOrigin: true,
    pathRewrite: { '^/docs/spectacles-service': '/api-docs' }
}));

app.use('/api/medicines', createProxyMiddleware({
    target: 'http://localhost:8004',
    changeOrigin: true,
    pathRewrite: { '^/api/medicines': '/medicines' }
}));

app.use('/api/medicine-orders', createProxyMiddleware({
    target: 'http://localhost:8004',
    changeOrigin: true,
    pathRewrite: { '^/api/medicine-orders': '/medicine-orders' }
}));

app.use('/docs/medicine-service', createProxyMiddleware({
    target: 'http://localhost:8004',
    changeOrigin: true,
    pathRewrite: { '^/docs/medicine-service': '/api-docs' }
}));

app.use('/api/feedback', createProxyMiddleware({
    target: 'http://localhost:8005',
    changeOrigin: true,
    pathRewrite: { '^/api/feedback': '/feedback' }
}));

app.use('/docs/feedback-service', createProxyMiddleware({
    target: 'http://localhost:8005',
    changeOrigin: true,
    pathRewrite: { '^/docs/feedback-service': '/api-docs' }
}));

app.use('/api/orders', createProxyMiddleware({
    target: 'http://localhost:8006',
    changeOrigin: true,
    pathRewrite: { '^/api/orders': '/orders' }
}));

app.use('/docs/order-service', createProxyMiddleware({
    target: 'http://localhost:8006',
    changeOrigin: true,
    pathRewrite: { '^/docs/order-service': '/api-docs' }
}));

app.use('/api/notifications', createProxyMiddleware({
    target: 'http://localhost:8007',
    changeOrigin: true,
    pathRewrite: { '^/api/notifications': '/notifications' }
}));

app.use('/docs/notification-service', createProxyMiddleware({
    target: 'http://localhost:8007',
    changeOrigin: true,
    pathRewrite: { '^/docs/notification-service': '/api-docs' }
}));


app.get('/', (req, res) => {
    res.send('API Gateway is running. Access routes via /api/...');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});