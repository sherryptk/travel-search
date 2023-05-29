import fs from 'fs';
import { HomeData, ListingData } from './interfaces';
import he from 'he';
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/listings', (req, res) => {
  try {
    const fileContent = fs.readFileSync('./listings.json', 'utf-8');
    const jsonData = JSON.parse(fileContent) as ListingData;
    let filteredListings = jsonData.data;

    const { location } = req.query;
    if (location) {
      filteredListings = filteredListings.filter(
        (listing) => listing.info.location.city.toLowerCase() === location.toLowerCase()
      );
    }

    res.json(filteredListings);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/listings/:id', (req, res) => {
  try {
    const fileContent = fs.readFileSync('./listings.json', 'utf-8');
    const jsonData = JSON.parse(fileContent) as ListingData;
    const { id } = req.params;
    console.log(jsonData.data[0].info);

    let listing = null;

    for (const homeData of jsonData.data) {
      if (homeData.info.id === id) {
        listing = homeData.info;
        break;
      }
    }

    if (listing) {
      // Decode description for the found listing
      listing.description = he.decode(listing.description);
      res.json(listing);
    } else {
      res.status(404).json({ error: 'Listing not found' });
    }
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});