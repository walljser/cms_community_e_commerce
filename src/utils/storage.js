export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getStorage = name => {
  if (!name) return
  // return JSON.parse(window.localStorage.getItem(name))
  return window.localStorage.getItem(name)
}

export const removeStorage = name => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
