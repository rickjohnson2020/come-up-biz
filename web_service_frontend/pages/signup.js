import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

// import { LockClosedIcon } from '@heroicons/react/solid';

const cookie = new Cookie();

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}account/auth/register/`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, email: email, password1: password1, password2: password2 }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 400) {
          throw "authentication failed";
        }
      });
      router.push('/login');
    } catch (err) {
      alert(err);
    }
  };

  // const authUser = async (e) => {
  //   e.preventDefault();
  //   if (isLogin) {
  //     login();
  //   } else {
  //     try {
  //       await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
  //         method: "POST",
  //         body: JSON.stringify({ username: username, password: password }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }).then((res) => {
  //         if (res.status === 400) {
  //           throw "authentication failed";
  //         }
  //       });
  //       login();
  //     } catch (err) {
  //       alert(err);
  //     }
  //   }
  // };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-100">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 rounded">
        <h1 className="text-2xl font-medium text-center text-gray-600">新規登録</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-xs font-semibold text-gray-600 uppercase">ユーザー名</label>
          <input 
            id="username" 
            type="text" 
            name="username" 
            placeholder="リック・ジョンソン" 
            autoComplete="name" 
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            className="rounded-sm block w-full p-3 mt-2 bg-gray-100 appearance-none focus:outline-none focus:shadow-inner" required />
          <label htmlFor="email" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">メールアドレス</label>
          <input 
            id="email" 
            type="email"
            name="email"
            placeholder="mail@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="rounded-sm block w-full p-3 mt-2 bg-gray-100 appearance-none focus:outline-none focus:shadow-inner" required />
          <label htmlFor="password1" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">パスワード</label>
          <input 
            id="password1" 
            type="password" 
            name="password1" 
            autoComplete="new-password" 
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value)
            }}
            className="rounded-sm block w-full p-3 mt-2 bg-gray-100 appearance-none focus:outline-none focus:shadow-inner" required />
          <label htmlFor="password2" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">パスワード(確認用)</label>
          <input 
            id="password2" 
            type="password" 
            name="password2" 
            autoComplete="new-password" 
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value)
            }}
            className="rounded-sm block w-full p-3 mt-2 bg-gray-100 appearance-none focus:outline-none focus:shadow-inner" required />
          <button type="submit" className="rounded-sm w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-yellow-400 shadow-lg focus:outline-none hover:bg-yellow-200 duration-500 hover:shadow-none">
            登録する
          </button>
          <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">すでにアカウントをお持ちですか？</p>
        </form>
      </div>
    </div>
  );
}