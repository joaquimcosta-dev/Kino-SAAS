import jwt from "jsonwebtoken";
//verificando o token
export const auth=(req,res,next)=>{
    const SECRET=process.env.SECRET_KEY;
   const token=req.headers.authorization;
        if(!token){
           return res.status(400).json({message:"Faça login para continuar"});
        }
   
    try {
        const decode = jwt.verify(token.replace('Bearer ',''), SECRET,(err,user)=>{
             req.user=user;
        });
       
        next();
        
    } catch (e) {
       return res.status(500).json({message:"Acesso negado"})
    }

}

export const permissaoAdmin=(req,res,next)=>{
    if (!req.user) {
        return res.status(500).json({message:"Usuário invalido, faça login"});
        
    }
    const {perfil}=req.user;
   
    
    if(perfil!=="admin"){
        return res.status(403).json({message:"acesso restritos, somente para os admin"});
    }
    
      next();
  
}