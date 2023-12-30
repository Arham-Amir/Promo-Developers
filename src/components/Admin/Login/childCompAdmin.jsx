'use client'
import { useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@api/dbConfig'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useStorage from '@api/storage';

const ChildCompAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const { setItem, getItem } = useStorage();
  const router = useRouter()
  const [user] = useAuthState(auth);
  const userSession = getItem();

  useEffect(() => {
    if (user && userSession) {
      router.push('/admin/items')
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        setItem("true")
        setEmail('');
        setPassword('');
        toast.success("Welcome Sir !")
        router.push("/admin/items")
      }
      else {
        toast.error("Invalid Email or Password")
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center ">
      <div className="bg-bg-1 text-themeFont p-10 rounded-lg shadow-xl shadow-themeFont w-96">
        <h1 className="text-2xl mb-5 text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-bg rounded outline-none placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-bg rounded outline-none placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-themeFont rounded text-white hover:bg-indigo-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default ChildCompAdmin;
