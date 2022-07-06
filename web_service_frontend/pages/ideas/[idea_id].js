import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import { getAllIdeaIds, getIdeaData, getAllIdeaAuthors} from "../../lib/ideas";
import useSWR from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = 'http://127.0.0.1:8000/api/idea/';

export default function IdeaData({ staticIdea, idea_id }) {
  const router = useRouter();
  const { data: idea, mutate } = useSWR(`${apiUrl}${idea_id}`, fetcher, {
    initialData: staticIdea,
  });
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !idea) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={idea.title}>
      <div className="space-y-5 w-full">
        <div className="flex justify-center flex-col items-center mb-5">
          <h1 className="text-3xl mb-3 font-bold">{idea.title}</h1>
          <p className="mb-3">{idea.likes_count}</p>
          <p className="mb-3">{idea.created_at}</p>
          <p className="mb-3">{idea.created_by.username}</p>
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
  const staticIdea = await getIdeaData(params.idea_id);
  console.log(staticIdea)
  return {
    props: {
      idea_id: staticIdea.idea_id,
      staticIdea,
    },
    revalidate: 3,
  };
}

// export async function getStaticPaths() {
//   const paths = await getAllIdeaAuthors();
//   return  {
//     paths,
//     fallback: true,
//   };
// }