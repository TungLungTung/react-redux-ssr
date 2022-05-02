import 'babel-polyfill';
import express from 'express';
/// React Router Config
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import proxy from 'express-http-proxy';
import createStore from './helpers/createStore';

// /// ES2015 modules work nicely with CommonJS
// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home.js').default;

const app = express();

/// Setup proxy here (Proxy inside Renderer API)
/// Neu access to route /api, auto send of to domain
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

/// Tell express that it need to treat that public directory as a static
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);
  /// Render as string and send to some HTML
  /// Some logic to initialize and load data in store

  /// Neu route nao match voi cai path thi call loadData() lien
  /// Return arrays of promises
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      /// Tuy nhien co mot so route se khong co loadData.
      /// Promise <pending>
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    /// Context object
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    // Send back to client
    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
