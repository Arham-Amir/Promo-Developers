'use client'

import { useEffect } from "react";

export const GetUser = () => {
  useEffect(() => {
    return window.sessionStorage.getItem('user')
  }, []);
}

export const SetUser = (uid) => {
  useEffect(() => {
    window.sessionStorage.setItem('user', uid)
  }, []);
}


