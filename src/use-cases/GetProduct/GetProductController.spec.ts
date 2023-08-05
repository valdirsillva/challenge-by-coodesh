import { request } from '../../../testGlobal';
import { describe, expect, test } from "@jest/globals";

describe("API Unit Tests", () => {
  test('GET /api/data should return JSON with products', async () => {
    const response = await request.get('/api/products')

    expect(response.status).toEqual(200);
  });
})