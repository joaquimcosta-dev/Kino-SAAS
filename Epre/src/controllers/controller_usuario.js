import express from "express";
import * as service from "../service/service_user.js";
import {permissaoAdmin} from '../middlewares/auth.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {buscarFuncionarioId} from '../service/serviceFuncionario.js';

const controller = express.Router();

//rota para criar usuario
controller.post("/cadastrar/:id",async (req, res) => {

  // verificando se os campos enviados estao vazios
  if (!req.body.username || !req.body.senha || !req.body.perfil) {
    return res
      .status(500)
      .json({ maessage: "Deve preecher os campos obrigatorio" });
  }
  //pegando o id do funcionário 
  const id_fun =req.params.id;
  try {
    //buscando funcionário no banco
    const fun = await buscarFuncionarioId(id_fun);
    if (!fun) {
      return res.status(401).json({message:"Funcionário não encontrado"});
      
    }
    const { username, senha, perfil } = req.body;
    //verifcando se o usuario ja existe no banco
    const user = await service.autenticacao({ username });
    if (user) {
      return res.status(400).json({ message: "Este usuario ja existe" });
    }
    const senhaCripto = await bcrypt.hash(senha,10);
    const estado = true;
    //chamando o service para criar o novo usuario
    const novo = await service.criar_usuario({
      username,
      senhaCripto,
      perfil,
      estado,
      id_fun
    });
    return res.status(201).json(novo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Erro ao tentar criar usuario" });
  }
});
//rota para login
controller.post("/login", async (req, res) => {
  // verificando se os campos enviados sao vazios
  if (!req.body.username || !req.body.senha) {
    return res
      .status(500)
      .json({ maessage: "Deve preecher os campos obrigatorio" });
  }
  try {
    const SECRET="202122elanoskill1999"
    const {username, senha } = req.body;
    //fazer autenticacao
    const user = await service.autenticacao({ username});
    //verificado o usuario
    if (!user) {
      return res.status(404).json({ maessage: "Usuario invalido" });
    }
    //verificar a senha se e valida
    const senha_verificada = await bcrypt.compare(senha,user.senha);
    if (!senha_verificada) {
      return res.status(400).json({ maessage: "Senha incorrecta" });
    }
    //gerar token
    const token = jwt.sign({id:user.id_user,perfil:user.perfil},SECRET,{expiresIn:"2h"});
    return res.status(200).json(token);
} catch (e) {
    console.log(e)
    return res.status(500).json({ maessage: "Ao tentar fazer o login" });
  }
});
//rota para listar todos listar Todos Usuarios
controller.get("/listar",async(req,res)=>{
   try {
     const lista = await service.buscar_todos_usuarios();
    return res.status(200).json(lista);
   } catch (e) {
    console.log(e)
    return res.status(400).json({message:"Erro ao tentar listar usuarios"});
    
   }
})
//rota para buscrar usuario por id
controller.get("/listar/:id",async(req,res)=>{
   const {id}=req.params;
   try {
    //buscar usuario
    const user = await service.buscar_usuarioId(id);
    //verificando o usuario se existe
    if(!user){
        return res.status(404).json({message:"Usuario nao encontrado"})
    }
    return res.status(200).json(user);

   } catch (e) {
    console.log(e)
    return res.status(400).json({message:"Erro ao tentar listar usuarios"});
    
   }
})
controller.delete("/deletar/:id",permissaoAdmin,async(req,res)=>{
    const id=req.params.id;
    try {
        //buscando usuario 
        const user = await service.buscar_usuarioId(id);
         //verificando se o usuario existe
        if(!user){
            return res.status(404).json({message:"Este usuario nao existe"})
        }
         //eliminando usuario
         const eliminado = await service.deletar_usuario(id)
         return res.status(202).json(user)
        
        
    } catch (e) {
        return res.status(400).json({message:"Erro ao tentar eiminar usuario"})
    }
})
export default controller;
