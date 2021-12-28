const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const dotenv = require('dotenv');
const winston = require('winston');
const pomodoroRouter = require('./services/transactionService');

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join(__dirname, 'client/build')));

/*
 * Criação de logs com winston
 */
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api-pomodoro.log' }),
  ],
  format: combine(label({ label: 'api-pomodoro' }), timestamp(), myFormat),
});

/**
 * Rota raiz
 */
app.get('/', (_, response) => {
  response.send({
    message: 'Bem-vindo à API pra gente testar essa bagaça',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/pomodoro', routes);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;
logger.info(`Iniciando conexão ao MongoDB...`);

// console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.wcspg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      logger.error(`Erro na conexão ao MongoDB - ${err}`);
      // console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  logger.info(`Conectado ao MongoDB`);

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    logger.info(`Servidor iniciado na porta ${APP_PORT}`);
    // console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
