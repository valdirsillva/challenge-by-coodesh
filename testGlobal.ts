import supertest from 'supertest';
import { Express } from 'express';
import { app } from './src/app'; // Caminho para o arquivo index.ts onde o aplicativo Express está definido

export const request = supertest(app);