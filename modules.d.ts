declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    HOST: string;
    FOOD_DATA_TEXT: string;
    FOOD_DATASET: string;
    DATABASE_MONGODB: string | undefined;
  }
}