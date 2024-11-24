const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); 

const app = express();
const PORT = 5000;

// BACKEND
const BACKEND_URL = 'http://10.0.140.169:3000';
app.use(express.json());

// STATIC Files Frontend
app.use(express.static(path.join(__dirname, 'public')));
const viewsPath = path.join(__dirname, 'public/views');

// Proxy configuration
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
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy encountered an error.');
    },
}));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend is being served at http://localhost:${PORT}`);
});


// --------- Directions --------------------

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


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'index_logInPending.html'));
});