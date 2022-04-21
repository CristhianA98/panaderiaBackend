const esImagenFile = (req, res, next) => {
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!req.files) {
        return res.status(201).json({
            ok: false,
            msg: "Se necesita al menos una imagen del producto"
        });
    }

    for (let i = 0; i < req.files.file.length; i++) {
        const fileUpload  = req.files.file[i];
        const nombreCortado = fileUpload.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return res.status(201).json({
                ok: false,
                msg: `Se admite solo extenciones: ${extensionesValidas}`
            });
        }
    }

    next();
}

module.exports = {
    esImagenFile
}