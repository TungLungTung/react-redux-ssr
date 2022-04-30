import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';

import createStore from './helpers/createStore';

// /// ES2015 modules work nicely with CommonJS
// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home.js').default;

const app = express();

/// Tell express that it need to treat that public directory as a static
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();

  /// Render as string and send to some HTML
  /// Some logic to initialize and load data in store
  res.send(renderer(req, store)); // send back to user
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
