export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: string;
            DB_SERVER: string;
            DB_LOCAL: string;
            DB_PASSWORD: string;
            PORT: string;
            NODE_ENV: string;
            JWT_SECRET: string;
            JWT_EXPIRES_IN: string;
            JWT_RESET_PASSWORD_SECRET: string;
            JWT_RESET_PASSWORD_EXPIRES_IN: string;
            APP_URL: string;
            PRODUCT_IMAGE_BUCKET: string;
        }
    }
}