import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />
, document.getElementById('root'));
// Ici on cherche dans le l'index "root" et le remplacer par notre fichier App.js
registerServiceWorker();
