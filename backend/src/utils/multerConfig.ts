import { catchAsync } from "./catchAsync";
import multer from "multer";

export const uploadFile = (field) => catchAsync((req,res,next) => {
  //Multer config
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })

  const upload = multer({storage: storage});
  upload.single(field);
  next();
})