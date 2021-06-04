import utils from '../util';

class ErrorHelper {
  handleErrors(err, doAlert) {
    if (doAlert) {
      if (err) {
        utils.showAlertWithDelay('Error', err, 1000);
      }
    }
  }
}

export default new ErrorHelper();
