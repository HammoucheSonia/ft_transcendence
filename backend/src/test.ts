import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module'; 

describe('Database Connection Test', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should test database connection', async () => {
    const response = await request(app.getHttpServer()).get('/test/database-connection');
    expect(response.status).toBe(200);
    expect(response.text).toBe('La connexion à la base de données est établie avec succès !');
  });
});
