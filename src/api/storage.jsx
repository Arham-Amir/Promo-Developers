'use client'

const useStorage = () => {
  const storageType = 'sessionStorage';

  const isBrowser = typeof window !== 'undefined';

  const getItem = () => {
    return isBrowser ? window[storageType]["user"] : false;
  };

  const setItem = (uid) => {
    if (isBrowser) {
      window[storageType].setItem("user", uid);
      return true;
    }
    return false;
  };

  const removeItem = () => {
    if (isBrowser) {
      window[storageType].removeItem("user");
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
