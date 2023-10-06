const multer = require('multer');

module.exports.uploadFile = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let fileType = file.originalname.split('.')[1];
            if (fileType === "jpg"|| fileType == "PNG" || fileType === "jpeg") {
                cb(null, (__dirname, './uploads'));
            }
            else {
                cb(null, new Error("Invalide file"));
            }
        },
        filename: (req, file, cb) => {
            cb(null,  Date.now() + '_' + file.originalname.split('.')[0]+ '.' + file.originalname.split('.')[1]);
        },
    }),

}