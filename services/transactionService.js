const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../index');

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

// Rotas de GET
const rootGet = async (req, res) => {
  try {
    transaction = await TransactionModel.find();
    logger.info(`Get pomodoro `);
    res.status(200).send(transaction);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }

  // try {
  //     throw new Error('É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm')
  // } catch (error) {
  //     logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
  //     res.status(400).send({ error: error.message })
  // };
};

const getByEmail = async (req, res) => {
  try {
    transaction = await TransactionModel.find({ email: req.params.email });
    logger.info(`Get pomodoro `);
    res.status(200).send(transaction);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }

  // try {
  //     throw new Error('É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm')
  // } catch (error) {
  //     logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
  //     res.status(400).send({ error: error.message })
  // };
};

// Rotas de Post
const insertPomodoro = async (req, res) => {
  try {
    let pomodoroSummary;
    pomodoroSummary = await TransactionModel.insertMany(req.body);
    logger.info(`Insert many transaction`);
    res.status(201).send('Criado com sucesso: ' + pomodoroSummary);
    // if (Object.keys(body).length > 1) {
    //     pomodoroSummary = await TransactionModel.insertMany(body);
    //     logger.info(`Insert many transaction` );
    //     return pomodoroSummary;
    // } else {
    //     pomodoroSummary = new TransactionModel(body);
    //     await pomodoroSummary.save();
    //     logger.info(`Insert one pomodoros` );
    //     return pomodoroSummary;
    // }
  } catch (error) {
    logger.error(`Insert pomodoro error  - ${error.message}`);
    res
      .status(500)
      .send(`Pomodoro deu merda na hora de gravar: ${error.message}`);
    return `Insert pomodoro error  - ${error.message}`;
  }
};

// Rota de Del

const delById = async (req, res) => {
  try {
    const deleteOnePomodoroHistory = await TransactionModel.findOneAndRemove({
      _id: req.params._id,
    });
    res.status(200).send(`Deletado com sucesso: ${deleteOnePomodoroHistory}`);
    logger.info(`[DEL] Delete byId pomodoro`);
  } catch (error) {
    logger.error(`[DEL] Delete byId pomodoro error  - ${error.message}`);
    res.status(500).send(`Deu merda no servidor ${error.message}`);
  }
};

// const getPeriod = async (req, res) => {
//     try {
//         const period = req.query.period
//         console.log(period)
//         const transaction = await getTransaction(undefined, period)
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message })
//     };
// };

// const getAllTransactions = async (req, res) => {
//     try {
//         const allTransactions = await getTransaction();
//         res.status(200).send(allTransactions);
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message })
//     };
// };

// const getOneTransaction = async (req, res) => {
//     try {
//         const transaction = await getTransaction(req.params.id)
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message })
//     };
// };

// const getTransaction = async (id, period) => {
//     try {
//         let transaction;
//         if (typeof period !== 'undefined'){
//             transaction = await TransactionModel.find({yearMonth: period});
//             logger.info(`Get transaction by period ${period}`);

//         } else if (typeof id === 'undefined') {
//             transaction = await TransactionModel.find();
//             logger.info(`Get all transaction` );
//             return transaction;

//         } else {
//             transaction = await TransactionModel.findById(id);
//             logger.info(`Get transaction by id ${id}`);
//             console.log(transaction)
//         };
//         if (!transaction){
//             logger.info(`Get transaction whith id: ${id} not found` );
//             return `Transação com o id: ${id} não foi encontrado`;

//        } else if (transaction.length === 0){

//             logger.info(`Get transaction whith period: ${period} not found` );
//             return `Transação com perido: ${period} não encontrado`;

//        } else {
//             return transaction
//         }

//     } catch (error) {
//         logger.error(`Get transaction error - ${error.message}`);

//         if (error.kind === 'ObjectId') {
//             return `Transação com o id: ${id} não foi encontrado`;

//         } else {
//             return `Get transaction error - ${error.message}`;

//         }
//     };
// };

// // Rotas de Delete

// const deleteOneTransaction = async (req, res) => {
//     try {
//         const transaction = await deleteTransaction(req.params.id)
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     };
// };

// const deleteAllTrans = async (req, res) => {
//     try {
//         const transaction = await deleteTransaction()
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     }
// }

// const deleteTransaction = async (id) => {
//     try {
//         let transaction;

//         if (typeof id === 'undefined')
//         {
//             transaction = await TransactionModel.deleteMany()
//             logger.info(`Delete all transaction` );
//             return transaction;
//         } else {
//             transaction = await TransactionModel.findOneAndRemove({ _id: id})

//             if (!transaction){
//                 logger.info(`Delete transaction whith id: ${id} not found` );
//                 return `Remoção de transação com o id: ${id} não foi encontrado`;
//             } else {
//                 return transaction;
//             };
//         };

//     } catch (error) {
//         logger.error(`Delete transaction error  - ${error.message}`);
//     };
// };

// // Rotas de insert

// const insertOneTransaction = async (req, res) => {
//     try {
//         const transaction = await insertTransaction(req.body)
//         res.status(201).send(transaction)

//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     }
// };

// const inserAllTrans = async (req, res) => {
//     try {
//         const transaction = await insertTransaction(req.body)
//         res.status(201).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     }
// }

// const insertTransaction = async (body) => {
//     try {
//         let transaction;

//         if (Object.keys(body).length > 1) {
//             transaction = await TransactionModel.insertMany(body);
//             logger.info(`Insert many transaction` );
//             return transaction;
//         } else {
//             transaction = new TransactionModel(body);
//             await transaction.save();
//             logger.info(`Insert one transaction` );
//             return transaction;
//         }

//     } catch (error) {
//         logger.error(`Insert transaction error  - ${error.message}`);
//         return `Insert transaction error  - ${error.message}`;
//     };
// };

// // Rotas de update

// const updateOneTransaction = async (req, res) => {
//     try {
//         const transaction = await updateTransaction(req.params.id, req.body)
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     }
// };

// const updateCompTransaction = async (req, res) => {
//     try {
//         const transaction = await updateTransaction(req.params.id, req.body)
//         res.status(200).send(transaction)
//     } catch (error) {
//         logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
//         res.status(400).send({ error: error.message });
//     }
// };

// const updateTransaction = async (id, body) => {
//     try {
//         let transaction;

//         console.log('antes do update')
//         transaction = await TransactionModel.findOneAndUpdate(
//             {_id: id}, body, { new : true }
//         );
//         console.log(transaction)
//         logger.info(`Update transaction with id ${id}` );

//         if (!transaction){
//             logger.info(`Id: ${id} not found to update` );
//             return `O id: ${id} não foi encontrado para atualização`;
//         } else {
//             return transaction;
//         };
//     } catch (error) {
//         logger.error(`Update transaction error  - ${error.message}`);
//         return `Update transaction error  - ${error.message}`
//     }
// }

module.exports = {
  rootGet,
  getByEmail,
  insertPomodoro,
  delById,
  // getPeriod,
  TransactionModel,
  // getAllTransactions,
  // getOneTransaction,
  // deleteAllTrans,
  // deleteOneTransaction,
  // insertOneTransaction,
  // inserAllTrans,
  // updateOneTransaction,
  // updateCompTransaction,
};
