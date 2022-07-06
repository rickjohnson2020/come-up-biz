import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout/layout";
import EditForm from "../../../components/editForm";
import StateContextProvider from "../../../context/StateContext";
import Idea from "../../../components/idea/idea";
import { getAllIdeaIds, getIdeaData } from "../../../lib/ideas";
import useSWR from "swr";



// export default function Edit(){
//   const [selectedIdea, setSelectedIdea] = useState({ id: 0, title: ""})
//
//   const update = async (e) => {
//     e.preventDefault();
//     await fetch(
//       `http://127.0.0.1:8000/api/idea/${selectedIdea.id}/`,
//       {
//         method: "PUT",
//         body: JSON.stringify({ title: selectedIdea.title }),
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `JWT ${cookie.get("access_token")}`,
//         },
//       }
//     ).then((res) => {
//       if (res.status === 401) {
//         alert("JWT Token not valid");
//       }
//     });
//     setSelectedIdea({ id: 0, title: "" });
//     ideaCreated();
//   };
//
// }










const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = 'http://127.0.0.1:8000/api/idea/';

export default function Edit({ staticIdea, id }) {
  const router = useRouter();
  const { data: idea, mutate } = useSWR(`${apiUrl}${id}`, fetcher, {
    initialData: staticIdea,
  });
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !idea) {
    return <div>Loading...</div>;
  }

  return (
    <StateContextProvider>
    <Layout title={idea.title}>
    <EditForm ideaCreated={mutate} />
      <ul>
        <Idea key={idea.id} idea={idea} ideaDeleted={mutate} />
      </ul>
      <div className="space-y-5 w-full">
        <div className="flex justify-center flex-col items-center mb-5">
          <h1 className="text-3xl mb-3 font-bold">{idea.title}</h1>
          <p className="mb-3">{idea.created_at}</p>
          <div className="border w-14"></div>
        </div>
        <p className="whitespace-pre-wrap">{idea.content}</p>
      </div>
      <Link href="/idea-list">
        <div className="flex cursor-pointer mt-8">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
    </StateContextProvider>
  );
}

// 投稿一覧の ID を取得
export async function getStaticPaths() {
  const paths = await getAllIdeaIds();
  return {
    paths,
    fallback: true,
  };
}

// 投稿詳細のデータを取得
export async function getStaticProps({ params }) {
  const staticIdea = await getIdeaData(params.id);
  return {
    props: {
      id: staticIdea.id,
      staticIdea,
    },
    revalidate: 3,
  };
}
