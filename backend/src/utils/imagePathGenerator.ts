import { AppError } from "./appError";

export class ImagePathGenerator {
    public getProductImagePath(fileName: string) {
        if (process.env.APP_URL && process.env.PRODUCT_IMAGE_BUCKET) {
            return process.env!.APP_URL! + process.env!.PRODUCT_IMAGE_BUCKET! + fileName;
        } else {
            throw new AppError('Product path is not declared', 403);
        }
    }
}