import { BaseRepository } from '#repositories/BaseRepository.js';

class UserListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserListRepository;
