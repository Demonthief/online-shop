import jwt from 'jsonwebtoken'

const protect = (req,res,next) =>{
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }

    token = token.split(" ")[1];

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log(decoded)
        req.user = decoded

        next();
    }catch(e){
        res.status(401).json({message : "Invalid Token"})
    }
}

export default protect