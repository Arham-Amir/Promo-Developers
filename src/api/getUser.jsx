'use client'
export const GetUser = () => {
  return window.sessionStorage.getItem('user')
}

export const SetUser = (uid) =>{
  window.sessionStorage.setItem('user', uid)
}


