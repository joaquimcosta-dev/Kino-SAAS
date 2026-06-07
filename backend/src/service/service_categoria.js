import * as model from "../model/categoria.js";


//cadastrar categoria
export const criarCat = async ({nome})=>{
  if(!nome || nome == ""){
    throw new Error("nome de categoria invalido")
  }

  const nomeLimpo = nome.trim();

  const resultado = await model.criarCategoria({
    nome: nomeLimpo
  });

  return {id_cat: resultado, mensagem: "categoria criada com sucesso"}

}

//buscar categoria por id
export const buscarCatId = async (id)=>{
  //verificar se os dados sao nulos
  if (!id) {
    throw new Error({message:'campo id nao pode estar vazio'});
  }
  const cat =await model.listarId(id);
  //validacao ou verificando se pegou a categoria
  if (!cat) {
    throw new Error({message:"categoria nao encontrado"});
    
  }
  
}

//buscar cat
export const buscarCat = async () =>{
  const [rows] = await model.listar();
  return rows;
}
