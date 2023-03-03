import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserListRepository;
