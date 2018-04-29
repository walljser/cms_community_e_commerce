import {
  ADMIN_API,
  USER_API
} from '../constants';
import axios from 'axios';
import
  rest
 from '../utils/rest';

const admin_category = `${ADMIN_API}/categories`;
const user_category = `${USER_API}/categories`;

const all = async (page, rows) => {
  if (page && rows ) {
    return await axios.get(user_category, {
      params: {
        page,
        rows
      }
    })
  } else {
    return await axios.get(user_category)
  }
}


const create = async (adminId, token, categoryName) => {
  return await rest.post(adminId, token)(
    admin_category,
    {
      categoryName
    }
  )
}

const update = async (adminId, token, category) => {
  return await rest.patch(adminId, token)(
    `${admin_category}/${category.categoryId}`,
    {
      categoryName: category.categoryName
    }
  )
}

const remove = async (adminId, token, categoryId) => {
  return await rest.remove(adminId, token)(
    `${admin_category}/${categoryId}`
  )
}

export default {
  all,
  create,
  update,
  remove
}
