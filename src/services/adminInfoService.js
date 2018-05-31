import {
  ADMIN_API
} from '../constants';
import {
  rest
} from '../utils';

const URL = `${ADMIN_API}/admins`;

const DEFAULT_POST = {
  userName: '',
  passWord: 0,
  nickName: null,
  phone: 0,
  superLevel: false
}

const DEFAULT_PATCH = {
  userName: '',
  passWord: 0,
  nickName: null,
  phone: 0,
  superLevel: false
}

const all = async (adminId, token) => {
  return await rest.get(adminId, token)(`${URL}/${adminId}`)
}

const create = async function(adminId, token, admin) {
  const postAdmin = Object.assign({}, DEFAULT_POST, admin)
  return rest.post(adminId, token)(
    URL,
    postAdmin
  )
}

const remove = async function(adminId, token, removeAdminId) {
  return rest.remove(adminId, token)(
    `${URL}/${removeAdminId}`
  )
}

const update = async function(adminId, token, admin) {
  console.log(admin)
  const patchData = Object.assign({}, DEFAULT_PATCH, admin)
  console.log(patchData)
  return rest.post(adminId, token)(
    `${URL}/${patchData.administratorId}`,
    patchData
  )
}

export default {
  all,
  create,
  remove,
  update
}
