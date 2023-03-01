import { BaseRepository } from '../../../repositories/BaseRepository.js';

class UserAddRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserAddRepository;
