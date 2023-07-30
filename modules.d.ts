declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    FOOD_DATA_TEXT: string;
    FOOD_DATASET: string;
    CLUSTER_DBMONGO_ATLAS: string | undefined;
  }
}