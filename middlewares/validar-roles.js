/* Verificar si es Administrador */
const esAdminRole = (req,res,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            ok:false,
            msg:"Ingrese un token correcto"
        })
    }

    const {rol} = req.usuario;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            ok:false,
            msg:`Operación únicamente para administrador`
        })
    }

    next();
}

/* Verificar si es Cliente */
const esClientRole = (req,res,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            ok:false,
            msg:"Ingrese un token correcto"
        })
    }

    const {rol} = req.usuario;

    if(rol!=='CLIENT_ROLE'){
        return res.status(401).json({
            ok:false,
            msg:`Operación únicamente para el Cliente`
        })
    }

    next();
}

/* Verificar si es Delivery */
const esDeliveryRole = (req,res,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            ok:false,
            msg:"Ingrese un token correcto"
        })
    }

    const {rol} = req.usuario;

    if(rol!=='USER_ROLE'){
        return res.status(401).json({
            ok:false,
            msg:`Operación únicamente para el Delivery`
        })
    }

    next();
}

module.exports = {
    esAdminRole,
    esClientRole,
    esDeliveryRole
}