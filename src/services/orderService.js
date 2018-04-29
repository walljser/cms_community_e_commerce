import {
  ADMIN_API
} from '../constants';
import rest from '../utils/rest';

const admin_url = `${ADMIN_API}/order`;

const all = async function (adminId, token) {
  return await rest.get(adminId, token)(admin_url)
}

export default {
  all
}
