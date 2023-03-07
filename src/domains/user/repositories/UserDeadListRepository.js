import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserDeadListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default UserDeadListRepository;
