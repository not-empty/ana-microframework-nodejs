import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserAddRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default UserAddRepository;
