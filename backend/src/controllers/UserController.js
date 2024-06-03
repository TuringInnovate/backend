const User = require('../models/userModel')

// CRIAR USUÁRIO
exports.createUser = async (req, res) => {
  try{
    // "Pegando" os dados dos campos pela requisição
    const { name, email, password } = req.body

    // Criando o novo usuário
    const newUser = new User({
      name,
      email,
      password,
    })

    // Se não tiver nenhum erro: mostrar usuário criado
    await newUser.save()
    res.status(201).send(newUser)
  }
  catch (error){
    // Caso tenha erro, mostra o erro
    res.status(400).send({
      error: 'Erro ao criar usuário: ' + error.message
    })
  }
}

// LISTAR TODOS USUÁRIOS
exports.listUser = async (req, res) => {
  try {
    // Procura todos os usuários
    const users = await User.find()
    res.status(200).send(users);
  }
  // Caso não consiga procurar
  catch (error) {
    res.status(500).send({
      error: 'Erro ao procurar usuários: ' + error.message
    });
  }
};

// LISTAR USUÁRIO POR ID
exports.getUser = async (req, res) => {
  try{
    // Tenta achar algum usuário com o ID
    const user = await User.findById(req.params.id)

    // Caso não encontre o usuário
    if(!user){
      return res.status(404).send({
        error: 'Usuário não encontrado'
      })
    }

    // Caso encontre o usuário
    res.status(200).send(user)
  }

  // Caso não consiga buscar
  catch(error){
    res.status(500).send({
      error: "Erro ao buscar o usuário: " + error.message
    })
  }
}

// ATUALIZAR USUÁRIO
exports.updateUser = async (req, res) => {
  try{
    const { name, email, password } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {name, email, password},
      {new: true, rundValidators: true} // Retorna o usuário atualizado e validado
    )
    
    // Caso não ache o usuário
    if(!user){
      return res.status(404).send({
        error: 'Usuário não encontrado'
      })
    }
    // Caso ache o usuário
    res.status(200).send(user)
  }
  catch (error){
    // Casa não consiga atualizar
    res.status(400).send({
      error: "Erro ao atualizar o usuário: " + error.message
    })
  }
}

// DELETAR USUÁRIO
exports.deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id)

    // Caso não ache o usuário
    if(!user){
      return res.status(404).send({
        error: "Usuário não encontrado"
      })
    }

    // Caso ache o usuário
    res.status(200).send({
      message: "Usuário deletado com sucesso"
    })

  }
  // Caso de erro ao deletar
  catch(error){
    res.status(500).send({
      error: "Erro ao deletar o usuário: " + error.message
    })
  }

  
}

// FAZER LOGIN DO USUÁRIO
exports.loginUser = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Caso algum campos esteja errado
  if (!user) {
    return res.status(400).json({
      message: 'Email ou senha incorretos' });
  }

  res.json({
    message: 'Login realizado com sucesso'
  });
}