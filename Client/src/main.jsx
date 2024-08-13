import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <App />
    </BrowserRouter>
,
)
