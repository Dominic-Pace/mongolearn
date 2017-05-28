import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../../models/restaurant';
import Review from '../../models/review';

import { authenticate } from '../../middleware/auth'

export default({ config, db }) => {
  let api = Router();

  // CREATE RESTAURANT - 'POST /v1/restaurant'
  api.post('/', authenticate, (req, res) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;
    newRest.foodType = req.body.foodType;
    newRest.averageCost = req.body.averageCost;
    newRest.geometry = req.body.geometry;

    newRest.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `Restaurant has been saved successfully`});
    });
  });

  // GET ALL RESTAURANTS - 'GET /v1/restaurant'
  api.get('/', authenticate, (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err) {
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // GET SINGLE RESTAURANTS - 'GET /v1/restaurant/{{id}}'
  api.get('/:id', authenticate, (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      res.json(restaurant);
    });
  });

  // UPDATE SINGLE RESTAURANT - 'PUT /v1/restaurant/{{id}}'
  api.put('/:id', authenticate, (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      restaurant.name = req.body.name;
      restaurant.foodType = req.body.foodType;
      restaurant.averageCost = req.body.averageCost;
      restaurant.geometry = req.body.geometry;

      restaurant.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: `Restaurant has been updated successfully`});
      });
    });
  });

  // DELETE SINGLE RESTAURANT - 'DELETE /v1/restaurant/{{id}}'
  api.delete('/:id', authenticate, (req, res) => {
    Restaurant.remove({
      _id: req.params.id
    }, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Restaurant Successfully Removed"})
    })
  });

  // ADD A (review) TO  RESTAURANT - 'ADD /v1/restaurant/{{id}}/reviews'
  api.post('/:id/reviews', authenticate, (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
         res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.review = req.body.review;
      newReview.restaurant = restaurant._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        restaurant.reviews.push(newReview);
        restaurant.save(err => {
          if(err) {
            res.send(err);
          }
          res.json({ message: 'Food truck review has saved'});
        });
      });
    });
  });

  // GET ALL REVIEWS FOR A RESTAURANT - 'GET /v1/restaurant/{{id}}/reviews'
  api.get('/:id/reviews', authenticate, (req, res) => {
    Review.find({ restaurant: req.params.id }, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
