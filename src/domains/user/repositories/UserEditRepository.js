import { BaseRepository } from '../../../repositories/BaseRepository.js';

class UserEditRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserEditRepository;
