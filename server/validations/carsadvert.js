import validator from 'validator';

class Carsvalidations {
  static createcarsad(req, res) {
    if (validator.isEmpty(req.body.owner)) {
      throw Error('Field owner is required');
    }

    if (validator.isEmpty(req.body.state)) {
      throw Error('This Field state must not be empty');
    }
    if (req.body.state !== 'new' && req.body.state !== 'used') {
      throw Error('Field state must be new or used');
    }
    if (validator.isEmpty(req.body.status)) {
      throw Error('This Field status must not be empty');
    }

    if (req.body.status !== 'sold' && req.body.status !== 'available') {
      throw Error('this status field must be sold or available');
    }
    if (validator.isEmpty(req.body.price)) {
      throw Error('Price field must not be empty');
    }
    if (req.body.price < 1) {
      throw Error('Price must be valid');
    }
    if (validator.isEmpty(req.body.manufacturer)) {
      throw Error('This field manufacturer must not be empty');
    }
    if (typeof req.body.manufacturer === 'number') {
      throw Error('This field manufacturer must be string');
    }
    if (validator.isEmpty(req.body.model)) {
      throw Error('This field model must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.model)) {
      throw Error('This field model must be string');
    }
    if (validator.isEmpty(req.body.body_type)) {
      throw Error('This field body_type is required');
    } else {

    }
    return true;
  }
}
export default Carsvalidations;
