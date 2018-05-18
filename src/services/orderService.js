import {
  ADMIN_API, ORDER_DISPATCHING, ORDER_FINISH, ORDER_REFUND_SUCCESS, ORDER_REFUNDING_FAILURE
} from '../constants';
import rest from '../utils/rest';

const admin_url = `${ADMIN_API}/order`;

const DEFAULT_PARAMS = {
  status: null,
  start: null,
  end: null,
  page: 1,
  rows: 10
}

const all = async function (adminId, token, requestParams) {
  const params = Object.assign({}, DEFAULT_PARAMS, requestParams)
  console.log(params)
  return await rest.get(adminId, token)(
    admin_url,
    params
  )
}

const statistics = async function (adminId, token) {
  return await rest.get(adminId, token)(
    `${ADMIN_API}/statistics/order`
  )
}

const update = async function (adminId, token, orderId, status) {
  if (status === ORDER_DISPATCHING) {
    return await deliver(adminId, token, orderId)
  } else if (status === ORDER_FINISH) {
    return await confirm(adminId, token, orderId)
  } else if (status === ORDER_REFUND_SUCCESS) {
    return await acceptRefund(adminId, token, orderId)
  } else if (status === ORDER_REFUNDING_FAILURE) {
    return await refuseRefund(adminId, token, orderId)
  } else {
    return null;
  }
}

/**
 * 发货
 * @param {*} adminId
 * @param {*} token
 * @param {*} orderId
 */
const deliver = async function (adminId, token, orderId) {
  return await rest.patch(adminId, token)(
    `${admin_url}/${orderId}/deliver`
  )
}

const confirm = async function (adminId, token, orderId) {
  return await rest.patch(adminId, token)(
    `${admin_url}/${orderId}/confirm`
  )
}

const acceptRefund = async function (adminId, token, orderId) {
  return await rest.remove(adminId, token)(
    `${admin_url}/${orderId}/refund`
  )
}

const refuseRefund = async function (adminId, token, orderId) {
  return await rest.patch(adminId, token)(
    `${admin_url}/${orderId}/refuse`
  )
}

export default {
  all,
  statistics,
  update
}
