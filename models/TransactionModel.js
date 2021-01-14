const mongoose = require('mongoose');

const schema = mongoose.Schema({
  totalOfPomodoros: {
    type: Number,
    required: true,
  } ,
  totalWorkingTime: {
    type: Number,
    required: true,
  },
  totalCycles: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now
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
