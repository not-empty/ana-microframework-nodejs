import { BaseRepository } from '#src/repositories/BaseRepository.js';

class UserDeleteRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default UserDeleteRepository;
