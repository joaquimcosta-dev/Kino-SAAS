import * as model from "../model/categoria.js";

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
