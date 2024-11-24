const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); 
console.log('createProxyMiddleware:', createProxyMiddleware);
const morgan = require('morgan'); // Optional: For better logging

const app = express();
const PORT = 5000;

// BACKEND
const BACKEND_URL = 'http://10.0.140.169:3000';

// Middleware to log all incoming requests
app.use(morgan('combined')); // Optional: Use morgan for detailed logs
app.use((req, res, next) => {
    console.log(`Frontend received request: ${req.method} ${req.url}`);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// **Move Proxy Middleware Before Static Middleware**
app.use('/api', createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove '/api' prefix
    },
    logLevel: 'debug', // Enable detailed logging
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

// STATIC Files Frontend - After Proxy Middleware
app.use(express.static(path.join(__dirname, 'public')));
const viewsPath = path.join(__dirname, 'public/views');

// --------- Directions --------------------

// Serve HTML pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(viewsPath, 'logIn.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(viewsPath, 'register.html'));
});
app.get('/activity', (req, res) => {
    res.sendFile(path.join(viewsPath, 'activity.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(viewsPath, 'profile.html'));
});
app.get('/index_logIn', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index_logIn.html'));
});
app.get('/info', (req, res) => {
    res.sendFile(path.join(viewsPath, 'info.html'));
});
app.get('/balance', (req, res) => {
    res.sendFile(path.join(viewsPath, 'balance.html'));
});
app.get('/roulette', (req, res) => {
    res.sendFile(path.join(viewsPath, 'roulette.html'));
});
app.get('/hi-lo', (req, res) => {
    res.sendFile(path.join(viewsPath, 'hi-lo.html'));
});
app.get('/mines', (req, res) => {
    res.sendFile(path.join(viewsPath, 'mineBet.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'index_logInPending.html'));
});

// Start the frontend server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend is being served at http://localhost:${PORT}`);
});
