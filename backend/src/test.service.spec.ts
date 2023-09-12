// test.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TestService', () => {
  let service: TestService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TestService>(TestService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check database connection', async () => {
    // Mock de la méthode find de userRepository
    (userRepository.find as jest.Mock).mockResolvedValue([{ /* données de l'utilisateur fictif ici */ }]);

    const isConnected = await service.checkDatabaseConnection();
    expect(isConnected).toBe(true);
  });

  it('should handle database connection error', async () => {
    // Mock d'une erreur lors de la méthode find de userRepository
    (userRepository.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    const isConnected = await service.checkDatabaseConnection();
    expect(isConnected).toBe(false);
  });
});

