import {
  ADMIN_API
} from '../constants';
import rest from '../utils/rest';

const admin_url = `${ADMIN_API}/order`;

const all = async function (adminId, token, status, start, end, page = 1, rows = 10) {
  return await rest.get(adminId, token)(
    admin_url, {
      status: status,
      page: page,
      rows: rows,
      start: start,
      end: end
    }
  )
}

export default {
  all
}
