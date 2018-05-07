import axios from 'axios';
import {
  ADMIN_API,
  USER_API
} from '../constants';
import rest from '../utils/rest';

const ADMIN_URL = `${ADMIN_API}/category/second`;
const USER_URL = `${USER_API}/category/second`;
const DEFAULT_POST = {
  categoryFirstId: 0,
  categoryName: '',
  imageFile: null
}

const all = async function() {
  return await axios.get(USER_URL)
}

const post = async function(adminId, token, categorySecond) {
  const postCategory = Object.assign({}, DEFAULT_POST, categorySecond)
  return rest.post(adminId, token)(
    ADMIN_URL,
    postCategory
  )
}

export default {
  all,
  post
}
