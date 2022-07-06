import { useState } from 'react'
import StateContextProvider from "../context/StateContext";
import IdeaForm from "../components/IdeaForm";
import Link from "next/link"
import { useRouter } from "next/router";
import nookies from 'nookies';
import Cookie from "universal-cookie";
// import Layout2 from "../components/layout/layout2";
// import { getAllIdeaIds, getIdeaData } from "../lib/ideas";


const cookie = new Cookie();

export default function EditIdea({ currentUser }) {
  // const [ideas, setIdeas] = useState([])
  const [idea, setIdea] = useState({
    title: '',
    // image: '',
    content: '',
    likes: [],
    // created_by: ''
  });
  // const { title, content } = idea;
  const router = useRouter();

  // const fetchIdeas = async () => {
  //   const response = await fetch('http://127.0.0.1:8000/api/idea/')
  //   const data = await response.json()
  //   setIdeas(data)
  // }

  const submitIdea = async (e) => {
    // if (title === undefined) return;
    const response = await fetch('http://127.0.0.1:8000/api/ideas/', {
      method: 'POST',
      body: JSON.stringify({
        title: idea.title,
        // image: idea.image,
        content: idea.content,
        likes: ["9ff8dca2-5d41-40c7-a379-39278da93f46"],
        created_by: currentUser.id
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get("access_token")}`,
      }
    })
    // e.preventDefault() //added
    const data = await response.json()
    console.log(data)
    router.push(`/ideas/${data.idea_id}`)
  }

  return (
    <div>
    <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
      <Link href="/">
        <a className="text-4xl font-bold text-red-300">ComeUpBiz</a>
      </Link>
      <nav className="ml-auto">
        <Link href="/idea-list">
          <a className="mr-5">キャンセル</a>
        </Link>
          <button onClick={submitIdea}>公開</button>
      </nav>
    </header>
      <div className="p-40">
        <div className="mb-10">
          <input
            className='w-96 h-15 font-semibold text-4xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={idea.title}
            onChange={e => setIdea({...idea, title: e.target.value})}
            placeholder='タイトル'
          />
        </div>
        {/* <div className="mb-10">
          <input
            className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='iamge'
            value={idea.image}
            onChange={e => setIdea({...idea, image: e.target.value})}
            placeholder='イメージ画像'
          />
        </div> */}
        <div className="mb-10">
          <input
            className='w-96 h-15 font-semibold text-4xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={idea.content}
            onChange={e => setIdea({...idea, content: e.target.value})}
            placeholder='本文'
          />
        </div>
        <div className="mb-10">
          <input
            className='w-96 h-15 font-semibold text-4xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={idea.likes}
            onChange={e => setIdea({...idea, likes: e.target.value})}
            placeholder='いいね'
          />
        </div>
        {/* <div className="mb-10">
          <input
            className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={idea.created_by}
            onChange={e => setIdea({...idea, created_by: e.target.value})}
            placeholder='投稿者'
          />
        </div> */}
        {/* <hr />
        <button onClick={fetchIdeas}>Load ideas</button>
        {ideas.map(idea => {
          return (
            <div key={idea.id}>
              {idea.id}. {idea.title}
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const res = await fetch('http://127.0.0.1:8000/account/auth/user/', {
    // method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookies.access_token}`,
    }
  });
  if (res.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  };
  const currentUser = await res.json()
  console.log(currentUser)

  return {
    props: {
      currentUser,
    }
  }
}

// 投稿一覧の ID を取得
// export async function getStaticPaths() {
//   const paths = await getAllIdeaIds();
//   return {
//     paths,
//     fallback: true,
//   };
// }














// export default function Edit() {
//   return (
//     <Link href="/">
//       <div className="flex cursor-pointer mt-12">
//         <svg
//           className="w-6 h-6 mr-3"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
//           />
//         </svg>
//         <span>Back to main page</span>
//       </div>
//     </Link>
//   )
// }
