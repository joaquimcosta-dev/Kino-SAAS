import * as model from "../model/categoria.js";
//buscar categoria por id
export const buscarCatId = async id => {
    const cat = await model.listarId(id);
    return cat;
};
