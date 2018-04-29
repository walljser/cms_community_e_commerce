import {
  ADMIN_API
} from '../constants';
import {
  rest
} from '../utils';

const URL = `${ADMIN_API}/admins`;

const all = async (adminId, token) => {
  console.log(6666)
  console.log(`${URL}/${adminId}`)
  return await rest.get(adminId, token)(`${URL}/${adminId}`)
}

export default {
  all
}
