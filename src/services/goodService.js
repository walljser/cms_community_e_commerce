import {
  ADMIN_API,
  DEFAULT_PAGE
} from '../constants';
import rest from '../utils/rest';
import { postData } from '../utils/postData';

const admin_good = `${ADMIN_API}/goods`
const DEFAULT = {
  categoryId: 100000,
  goodName: '',
  price: 0,
  originalPrice: 0,
  inventory: 0,
  spec: '1*1',
  origin: '',
  imageFile: ''
}

const all = async (adminId, token, good, page = DEFAULT_PAGE, rows = 8) => {
  if (good) {
    return await rest.get(adminId, token)(admin_good, {
      page: page,
      rows: rows,
      goodId: good.goodId,
      goodName: good.goodName,
      categoryId: good.categoryId,
      goodStatus: good.status
    })
  } else {
    return await rest.get(adminId, token)(admin_good, {
      page: page,
      rows: rows
    })
  }
}

const create = async (
  adminId,
  token,
  good,
  imageFile
) => {
  const goodData = {
    ...DEFAULT,
    ...good,
    imageFile
  }

  return await rest.post(adminId, token)(
    admin_good,
    {
      ...goodData,
      imageFile
    }
  )
}

const update = async (
  adminId,
  token,
  good
) => {
  return await rest.patch(adminId, token)(
    `${admin_good}/${good.goodId}`,
    good
  )
}

const inventory = async (
  adminId,
  token,
  goodId,
  putInNumber
) => {
  return await rest.patch(adminId, token)(
    `${admin_good}/${goodId}/inventory`,
    {
      inventory: putInNumber
    }
  )
}

export default {
  all,
  create,
  update,
  inventory
}
