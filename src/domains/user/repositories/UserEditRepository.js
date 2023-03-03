import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserEditRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserEditRepository;
