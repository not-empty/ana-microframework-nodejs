import { BaseRepository } from '../../../repositories/BaseRepository.js';

class UserBulkRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

export default new UserBulkRepository;
