import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAllIdeaAuthors, getIdeasByUser, getUserAllIdeas } from "../../lib/ideas";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import useSWR from "swr";
import Idea from "../../components/idea/idea";
import StateContextProvider from "../../context/StateContext";
import { getUserProfile } from "../../lib/users";



const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = 'http://127.0.0.1:8000/api/';

export default function IdeaData({ username, userIdeas, userProfile }) {
  const router = useRouter();
  const { data: ideas, mutate } = useSWR(`${apiUrl}${username}`, fetcher, {
    initialData: userIdeas,
  });
  const { data: profile } = useSWR(`http://127.0.0.1:8000/account/${username}`, fetcher, {
    initialData: userProfile,
  })
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !ideas) {
    return <div>Loading...</div>;
  }

  return (
    <StateContextProvider>
      <Layout title="アイデア一覧">
        <div>
          <h1>{profile.user}</h1>
          <p>{profile.bio}</p>
        </div>
          <ul>
            {ideas &&
              ideas.map((idea) => (
                <Idea key={idea.idea_id} idea={idea} ideaDeleted={mutate} />
              ))}
          </ul>
          <Link href="/">
            <div className="flex cursor-pointer mt-12">
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
              <span>Back to Home</span>
            </div>
          </Link>
      </Layout>
    </StateContextProvider>
  );
}






// Get created_by of all the ideas
export async function getStaticPaths() {
  const paths = await getAllIdeaAuthors();
  return {
    paths,
    fallback: true,
  };
}

// Get each user's all the ideas
export async function getStaticProps({ params }) {
  const userIdeas = await getIdeasByUser(params.created_by)
  // const userIdeas = JSON.stringify(ideas)
  const userProfile = await getUserProfile(params.created_by)
  console.log(userIdeas)
  console.log(userProfile)
  console.log(params.created_by)
  return {
    props: {
      username: userProfile.user,
      userIdeas,
      userProfile,
    },
    revalidate: 3,
  };
}