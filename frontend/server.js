const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); 
console.log('createProxyMiddleware:', createProxyMiddleware);
const morgan = require('morgan'); 

const app = express();
const PORT = 5000;

// Backend Server URL
const BACKEND_URL = 'http://10.0.140.169:3000';

// Logging Middleware
app.use(morgan('combined'));
app.use((req, res, next) => {
    console.log(`Frontend received request: ${req.method} ${req.url}`);
    next();
});

// Proxy Middleware for /api
app.use('/api', createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    logLevel: 'debug', // Detailed logging
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${BACKEND_URL}${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`Received response from backend: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy encountered an error.');
    },
}));

// Start Frontend Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend is being served at http://localhost:${PORT}`);
});