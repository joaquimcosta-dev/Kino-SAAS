import jwt from "jsonwebtoken";
//verificando o token
export const auth=(req,res,next)=>{
    const SECRET="202122elanoskill1999";
   const token=req.headers.authorization;
        if(!token){
            res.status(400).json({message:"Faça login para continuar"});
        }
   
    try {
        const decode = jwt.verify(token.replace('Bearer ',''), SECRET,(err,user)=>{
             req.user=user;
        });
       
        next();
        
    } catch (e) {
        res.status(500).json({message:"Acesso negado"})
    }

}

export const permissaoAdmin=(req,res,next)=>{
    const {perfil}=req.user;
   
    
    if(perfil!=="admin"){
        return res.status(403).json({message:"acesso restritos, somente para os admin"});
    }
    
      next();
  
}