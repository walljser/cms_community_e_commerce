import axios from 'axios';
import {
  ADMIN_API
} from '../constants';
import { postData } from '../utils/postData';

const url = `${ADMIN_API}/tokens`

const post = async (username, password) => {
  console.log(url)
  return await axios.post(url, postData({
    userName: username,
    passWord: password
  }))
}

export default {
  post
}
