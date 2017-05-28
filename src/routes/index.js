import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import restaurant from '../controller/restaurant';
import account from '../controller/account';

let router = express();

//Connect to database
initializeDb(db => {

  //Internal middleware
  router.use(middleware({ config, db }));

  // API Routes v1
  router.use('/restaurant', restaurant({ config, db }));
  router.use('/account', account({ config, db }));

});

export default router;
