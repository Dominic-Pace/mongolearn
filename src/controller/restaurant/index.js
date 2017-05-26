import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../../models/restaurant';

export default({ config, db }) => {
  let api = Router();

  // '/v1/restaurant/add'
  api.post('/', (req, res) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `Restaurant named ${newRest.name} has been saved successfully`})
    });
  });
  
  return api;
}
