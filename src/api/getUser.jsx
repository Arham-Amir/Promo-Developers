export const GetUser = () => {
  return sessionStorage.getItem('user')
}

export const SetUser = (uid) =>{
  sessionStorage.setItem('user', uid)
}


