const express = require('express');
const pomodoroRouter = express.Router();

// const app = express();
const transactionService = require('../services/transactionService');

pomodoroRouter.post('/', transactionService.insertPomodoro);
pomodoroRouter.get('/', transactionService.rootGet);
pomodoroRouter.delete('/:_id', transactionService.delById);
//Retrive
// transactionRouter.get('/', transactionService.rootGet);
// transactionRouter.get('/period/:period?', transactionService.getPeriod);
// transactionRouter.get('/all', transactionService.getAllTransactions);
// transactionRouter.get('/one/:id', transactionService.getOneTransaction);

// // Delete
// transactionRouter.delete('/all', transactionService.deleteAllTrans);
// transactionRouter.delete('/one/:id', transactionService.deleteOneTransaction);

// Insert
// transactionRouter.post('/all', transactionService.inserAllTrans)
// transactionRouter.post('/one', transactionService.insertOneTransaction)

// Update
// transactionRouter.patch('/one/:id', transactionService.updateOneTransaction);
// transactionRouter.put('/complete/:id', transactionService.updateCompTransaction);

module.exports = pomodoroRouter;