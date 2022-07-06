import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

// import { LockClosedIcon } from '@heroicons/react/solid';

const cookie = new Cookie();

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}account/auth/login/`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const options = { path: "/" };
          console.log(data);
          cookie.set("access_token", data.access_token, options);
        });
      router.push("/");
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
  //       await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/registration/`, {
  //         method: "POST",
  //         body: JSON.stringify({ username: username, email: email, password: password }),
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
        <h1 className="text-2xl font-medium text-center text-gray-600">ログイン</h1>
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
          <label htmlFor="password" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">パスワード</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            autoComplete="new-password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="rounded-sm block w-full p-3 mt-2 bg-gray-100 appearance-none focus:outline-none focus:shadow-inner" required />
          <button type="submit" className="rounded-sm w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-yellow-400 shadow-lg focus:outline-none hover:bg-yellow-200 duration-500 hover:shadow-none">
            ログイン
          </button>
          <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">すでにアカウントをお持ちですか？</p>
        </form>
      </div>
    </div>
  );
}