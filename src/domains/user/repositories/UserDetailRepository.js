import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserDetailRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserDetailRepository;
