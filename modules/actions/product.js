import Appbase from 'appbase-js';
import { appBaseConfig } from '../../utils/constants';
import createAction from '../utils/actionCreator';
import AppConstants from '../utils/constants';
const appbase = Appbase(appBaseConfig);


export function fetchProduct(id) {
  return dispatch => {
    dispatch(createAction(AppConstants.PRODUCT.GET));
    return appbase
      .search({
        type: appBaseConfig.app,
        body: {
          query: {
            term: {
              id
            }
          }
        }
      })
      .then(
        res => {
          dispatch(
            createAction(AppConstants.PRODUCT.GET_SUCCESS, res.hits.hits[0])
          );
        },
        error => {
          dispatch(createAction(AppConstants.PRODUCT.GET_ERROR, null, error));
        }
      );
  };
}
