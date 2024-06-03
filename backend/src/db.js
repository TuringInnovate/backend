const mongoose = require('mongoose');

const uri = 'mongodb+srv://turinginnovatetcc:tcc2024@bancoturing.ecajdri.mongodb.net/?retryWrites=true&w=majority&appName=BancoTuring';


const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
