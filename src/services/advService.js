import axios from 'axios';
import {
  ADMIN_API,
  USER_API
} from '../constants';
import {
  rest
} from '../utils';

const DEFAULT_POST = {
  name: '',
  categorySecondId: 0,
  image: null
}

const DEFAULT_PATCH = {
  advId: 0,
  name: '',
  categorySecondId: 0,
  image: null
}

const all = async function() {
  return await axios.get(`${USER_API}/advs`)
}

const create = async function(adminId, token, adv) {
  const postAdv = Object.assign({}, DEFAULT_POST, adv)
  return rest.post(adminId, token)(
    `${ADMIN_API}/advs`,
    postAdv
  )
}

const remove = async function(adminId, token, advId) {
  return rest.remove(adminId, token)(
    `${ADMIN_API}/advs/${advId}`
  )
}

const update = async function(adminId, token, adv) {
  const patchData = Object.assign({}, DEFAULT_PATCH, adv)
  return rest.post(adminId, token)(
    `${ADMIN_API}/advs/${patchData.advSwiperId}`,
    patchData
  )
}

export default {
  all,
  create,
  update,
  remove
}
