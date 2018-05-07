import {
  ADMIN_API,
  USER_API
} from '../constants';
import axios from 'axios';
import rest from '../utils/rest';

const ADMIN_CATEGORY = `${ADMIN_API}/category/first`;
const USER_CATEGORY = `${USER_API}/category/first`;

const all = async (page, rows) => {
  if (page && rows ) {
    return await axios.get(USER_CATEGORY, {
      params: {
        page,
        rows
      }
    })
  } else {
    return await axios.get(USER_CATEGORY)
  }
}


const create = async (adminId, token, categoryName) => {
  return await rest.post(adminId, token)(
    ADMIN_CATEGORY,
    {
      categoryName
    }
  )
}

const update = async (adminId, token, category) => {
  return await rest.patch(adminId, token)(
    `${ADMIN_CATEGORY}/${category.categoryFirstId}`,
    {
      categoryName: category.categoryName
    }
  )
}

const remove = async (adminId, token, categoryFirstId) => {
  return await rest.remove(adminId, token)(
    `${ADMIN_CATEGORY}/${categoryFirstId}`
  )
}

export default {
  all,
  create,
  update,
  remove
}
