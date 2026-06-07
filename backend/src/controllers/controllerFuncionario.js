import express from "express";
import * as servico from "../service/serviceFuncionario.js";
import {permissaoAdmin} from '../middlewares/auth.js'
const controller = express.Router();

//controler para fazer o cadastro do funcionario
controller.post("/cadastrar",permissaoAdmin, async (req, res) => {
//verificar os campos a serem enviados pelo corpo
if (!req.body.nome || !req.body.bilhete || !req.body.data_nasc) {
return res
.status(400)
.json({ message: "Campos obrigatorio deve sem preenchido" });
}
const { nome, bilhete, data_nasc, tel } = req.body;
try {
//procurando bilhete no banco
const fun = await servico.procurarBilhete(bilhete);
if (fun) {
return res.status(200).json({ message: "Este BI já existe no banco" });
}
const novo = await servico.criarFuncionario({ nome, bilhete, data_nasc, tel });
return res.status(201).json(novo);
} catch (e) {
console.log(e)
return res
.status(500)
.json({ message: "Erro ao tentar cadastrar funcionario" });
}
});

//controler para listar  funcionario
controller.get("/listar",permissaoAdmin, async (req, res) => {
try {
const lista = await servico.listarFuncionarios();
return res.status(200).json(lista);
} catch (e) {
console.log(e)
return res
.status(500)
.json({ message: "Erro ao tentar listar funcionario" });
}
});
//controler para procurar funcionario
controller.get("/listar/:id", async (req, res) => {
const id = req.body.id;
try {
const encontrado = await servico.buscarFuncionario(id);
return res.status(200).json(encontrado);
} catch (e) {
return res
.status(500)
.json({ message: "Erro ao tentar listar funcionario" });
}
});
// controler para deletar funcionario
controller.delete("/deletar/:id",permissaoAdmin, async (req, res) => {
console.log("id", req.params.id)

const id = req.params.id;

try {
//verificando se o funcionario exsite
const fun = await servico.buscarFuncionarioId(id);
if (!fun){
return res
.status(400)

.json({ message: "funcionário não encontrado" }); }
const eliminado = await servico.deletar_funcionario(fun.id_fun);
return res.status(200).json({ message: "Eliminado com sucesso" });
} catch (e) {
console.log(e)
return res
.status(500)

.json({ message: "Erro ao tentar eliminar funcionario" });
}
});
 controller.put("/editar/:id",permissaoAdmin, async(req,res)=>{
const {id} = req.params;
const {nome, bilhete, tel, data_nasc} = req.body
try{
//buscar o fun no banco
const fun = await servico.buscarFuncionarioId(id);
//verificar se existe
if (!fun){
return res.status(403).json({message: "funcionário não encontrado"})
}
const editado = await servico.editarFuncionario({id,nome, bilhete, data_nasc, tel})
return res.status(200).json({message:"atualido com sucesso"});
}catch(e){
  console.log(e)
  return res.status(500).json({message:"Erro no servidor"});

}
})
export default controller;