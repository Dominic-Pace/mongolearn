import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../../models/restaurant';

export default({ config, db }) => {
  let api = Router();

  // CREATE RESTAURANT - 'POST /v1/restaurant'
  api.post('/', (req, res) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `Restaurant has been saved successfully`});
    });
  });

  // GET ALL RESTAURANTS - 'GET /v1/restaurant'
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err) {
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // GET SINGLE RESTAURANTS - 'GET /v1/restaurant/{{id}}'
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      res.json(restaurant);
    });
  });

  // UPDATE SINGLE RESTAURANT - 'PUT /v1/restaurant/{{id}}'
  api.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      restaurant.name = req.body.name;

      restaurant.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: `Restaurant has been updated successfully`});
      });
    });
  });

  // DELETE SINGLE RESTAURANT - 'DELETE /v1/restaurant/{{id}}'
  api.delete('/:id', (req, res) => {
    Restaurant.remove({
      _id: req.params.id
    }, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Restaurant Successfully Removed"})
    })
  });

  return api;
}
