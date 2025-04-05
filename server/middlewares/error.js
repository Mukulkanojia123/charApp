
const errorMiddleware = (err, req, res, next)=>{
    err.message ||= "Invalid Server Error";
    err.statusCode||= 500


    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

const TryCatch = (passFunc) => async(req, res, next) =>{
    try{

        await passFunc(req, res, next);
    }catch(err){
        next(err)
    }
}

export {errorMiddleware, TryCatch}