import { BaseRepository } from '#repositories/BaseRepository.js';

class UserDeleteRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserDeleteRepository;
