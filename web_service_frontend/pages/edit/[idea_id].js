import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { StateContext } from "../../context/StateContext";
import Cookie from "universal-cookie";
import Link from "next/link"
import Layout from '../../components/layout/layout'
import StateContextProvider from "../../context/StateContext";
import { getAllIdeaIds, getIdeaData, getIdeasByUser } from "../../lib/ideas";
import useSWR from "swr";
import dynamic from "next/dynamic";
import nookies from 'nookies';

// import Idea from "../components/idea/idea"

const cookie = new Cookie();

// let CustomEditor;
// if (typeof window !== "undefined") {
//   CustomEditor = dynamic(() => import('../../components/Editor/CustomEditor'));
// }

const CustomEditor = dynamic(() => import('../../components/Editor/CustomEditor'), {
  ssr: false,
});

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = 'http://127.0.0.1:8000/api/idea/';

export default function EditIdea({ staticIdea, idea_id, currentUser }) {
  const [selectedIdea, setSelectedIdea] = useState({
    title: '',
    // image: '',
    content: '',
    likes: '',
    created_by: ''
  });
  // const [selectedIdea, setSelectedIdea] = useState({
  //   id: staticIdea.id,
  //   title: staticIdea.title,
  //   image: staticIdea.image,
  //   content: staticIdea.content,
  //   likes: staticIdea.likes,
  //   created_by: currentUser,
  //   created_at: staticIdea.created_at,
  //   updated_at: staticIdea.updated_at,
  // });
  const router = useRouter();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/idea/${idea_id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSelectedIdea({
          title: data.title,
          // image: data.image,
          content: data.content,
          likes: data.likes,
          // created_by: data.created_by.id
        })
      })
      .catch(error => {
        console.error(error);
        console.log(selectedIdea);
      })
  }, [idea_id]);

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/idea/${idea_id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setSelectedIdea(data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }, [idea_id]);

  // const { data: idea, mutate } = useSWR(`${apiUrl}${idea_id}`, fetcher, {
  //   initialData: staticIdea,
  // });
  // useEffect(() => {
  //   mutate();
  //   setSelectedIdea(idea);
  // }, []);
  // if (router.isFallback || !idea) {
  //   return <div>Loading...</div>;
  // }

  // console.log(idea)
  // setSelectedIdea(idea);

  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `http://127.0.0.1:8000/api/ideas/${idea_id}/`, // selectedIdea.idea_id => idea_id
      {
        method: "PUT",
        body: JSON.stringify({
          title: selectedIdea.title,
          content: selectedIdea.content,
          likes: selectedIdea.likes,
          created_by: currentUser.id
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    router.push(`/ideas/${idea_id}`) // selectedIdea.idea_id => idea_id
    // console.log(selectedIdea);
    setSelectedIdea({ id: 0, title: "" });
  };


  return (
    <>
      <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
        <Link href="/">
          <a className="text-4xl font-bold text-red-300">ComeUpBiz</a>
        </Link>
        <nav className="ml-auto">
          <Link href="/idea-list">
            <a className="mr-5">削除</a>
          </Link>
            <button onClick={update}>更新</button>
        </nav>
      </header>
      <div className="p-40">
        <div className="mb-10">
          <input
            className='w-96 h-15 font-semibold text-4xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={selectedIdea.title}
            onChange={e => setSelectedIdea({...selectedIdea, title: e.target.value})}
            placeholder='タイトル'
          />
        </div>
        <div className="mb-10">
          <input
            className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={selectedIdea.content}
            onChange={e => setSelectedIdea({...selectedIdea, content: e.target.value})}
            placeholder='本文'
          />
        </div>
        <div className="mb-10">
          <input
            className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={selectedIdea.likes}
            onChange={e => setSelectedIdea({...selectedIdea, likes: e.target.value})}
            placeholder='いいね'
          />
        </div>
        {/* <div className="mb-10">
          <input
            className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
            type='text'
            value={selectedIdea.created_by.id}
            onChange={e => setSelectedIdea({...selectedIdea, created_by: e.target.value})}
            placeholder='投稿者'
          />
        </div> */}
      </div>
    </>
  )
}

// export async function getStaticPaths() {
//   const paths = await getAllIdeaIds();
//   return {
//     paths,
//     fallback: true,
//   };
// }

// // 投稿詳細のデータを取得
// export async function getStaticProps({ params }) {
//   const staticIdea = await getIdeaData(params.idea_id);
//   return {
//     props: {
//       idea_id: staticIdea.idea_id,
//       staticIdea,
//     },
//     revalidate: 3,
//   };
// }

export async function getServerSideProps(ctx) {
  const { idea_id } = ctx.query;
  const staticIdea = await getIdeaData(idea_id);
  const cookies = nookies.get(ctx);
  const res = await fetch('http://127.0.0.1:8000/account/auth/user/', {
    // method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookies.access_token}`,
    }
  });
  const currentUser = await res.json()
  console.log(staticIdea)

  if (currentUser.id !== staticIdea.created_by.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  };
  return {
    props: {
      currentUser,
      staticIdea,
      idea_id,
    }
  }
}