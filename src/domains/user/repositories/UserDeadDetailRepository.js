import { BaseRepository } from '#repositories/BaseRepository.js';

class UserDeadDetailRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserDeadDetailRepository;
