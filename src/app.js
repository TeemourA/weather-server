import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import express from 'express';
import hbs from 'hbs';

import { getWeatherDataForLocation } from '../api/index.js';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticDirPath));

const footerInfo = 'Created by Timur Akhmedov';

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    footerInfo,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About project',
    footerInfo,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    helpInfo: 'Some helpful information',
    footerInfo,
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({
      error: 'You have to provide an address',
    });
  }

  try {
    const data = await getWeatherDataForLocation(req.query.address);
    res.send({ ...data });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/help/*', (req, res) => {
  res.status(404).render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    footerInfo,
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: '404',
    errorMessage: 'Page not found',
    footerInfo,
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
