// test.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity'; // Remplacez ceci par le chemin de votre entité utilisateur

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      // Vous pouvez effectuer une opération de base de données ici, par exemple, une requête
      const users = await this.userRepository.find();
      return true;
    } catch (error) {
      return false;
    }
  }
}

