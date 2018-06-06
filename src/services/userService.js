import {
  ADMIN_API,
  USER_API
} from '../constants';
import rest from '../utils/rest';

const DEFAULT = {
  userId: 1,
  userName: '',
  nickName: ''
}

const admin_url = `${ADMIN_API}/user`
const user_url = `${USER_API}/user`

const all = async (adminId, token) => {
  return await rest.get(adminId, token)(admin_url)
}

const get = async (adminId, token, userId) => {
  return await rest.get(adminId, token)(
    `${admin_url}/${userId}`
  )
}

const update = async (adminId, token, user) => {
  const updateDate = {}
  updateDate.userId = user.userId
  if (user.nickName) {
    updateDate.nickName = user.nickName
  }
  if (user.userName) {
    updateDate.passWord = user.passWord
  }
  return await rest.post(adminId, token)(
    `${user_url}/${user.userId}`,
    updateDate
  )
}

export default {
  update,
  all,
  get
}
