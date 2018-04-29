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
  return await rest.patch(adminId, token)(
    `${user_url}/${user.userId}`,
    {
      userId: user.userId,
      userName: user.userName,
      nickName: user.nickName
    }
  )
}

export default {
  update,
  all,
  get
}
