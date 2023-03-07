import Response from '#src/core/response.js';
import UserDeleteBusiness from '../businesses/UserDeleteBusiness.js';

class UserDeleteController {
  constructor() {
    this.userDeleteBusiness = new UserDeleteBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.userDeleteBusiness.process(id);
    if (process === false) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found',
        ),
      );

      return false;
    }

    res.status(204).send('');
  }
}

export default UserDeleteController;
