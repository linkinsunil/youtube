import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { VideoProvider } from './context/videoContext';
import { makeServer } from './server';

makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VideoProvider>
    <App />
  </VideoProvider>
);
