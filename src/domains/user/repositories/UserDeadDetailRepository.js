import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserDeadDetailRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserDeadDetailRepository;
