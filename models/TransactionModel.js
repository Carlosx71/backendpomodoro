const mongoose = require('mongoose');

let schema = mongoose.Schema({
  pomodoroTime: {
    type: Number,
    required: true,
  } ,
  shortRestTime: {
    type: Number,
    required: true,
  },
  longRestTime: {
    type: Number,
    required: true,
  },
  cycles: {
    type: Number,
    required: true,
  }
});

const TransactionModel = mongoose.model('pomodoro', schema);

module.exports = TransactionModel;



// let schema = mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   } ,
//   value: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   } ,
//   year: {
//     type: Number,
//     required: true,
//   },
//   month: {
//     type: Number,
//     required: true,
//   },
//   day: {
//     type: Number,
//     required: true,
//   },
//   yearMonth: {
//     type: String,
//     required: true,
//   } ,
//   yearMonthDay: {
//     type: String,
//     required: true,
//   } ,
//   type: {
//     type: String,
//     required: true,
//   } ,
// });

// const TransactionModel = mongoose.model('transaction', schema);

// module.exports = TransactionModel;
