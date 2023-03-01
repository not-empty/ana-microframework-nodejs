import { BaseRepository } from '../../../repositories/BaseRepository.js';

class UserDeadListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserDeadListRepository;
