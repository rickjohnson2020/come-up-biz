import { useEffect } from "react";
import Layout from "../components/layout/layout";
import Link from "next/link";
import { getAllIdeaAuthors, getAllIdeasData } from "../lib/ideas";
import { getCurrentUser } from "../lib/users";
import Idea from "../components/idea/idea";
import useSWR from "swr";
import StateContextProvider from "../context/StateContext";
import IdeaForm from "../components/IdeaForm";
import nookies from 'nookies';


const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = 'http://127.0.0.1:8000/api/idea/';


export default function MyIdeaList({ ideas, userId }) {
  var { data: ideas, mutate } = useSWR(apiUrl, fetcher, {
    initialData: ideas,
  });
  // console.log(ideas);
  // return only the ideas matching with logged in user
  const filteredIdeas = ideas.filter(function(idea) {
    // console.log(typeof(idea.created_by.id))
    return idea.created_by.id == userId;
  });
  console.log(filteredIdeas);
  // const getCurrentUser = async () => {
  //   await fetch(`http://127.0.0.1:8000/account/auth/user/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `JWT ${cookie.get("access_token")}`,
  //     },
  //   }).then((res) => {
  //     if (res.status === 401) {
  //       alert("JWT Token not valid");
  //     }
  //   });
  // };
  useEffect(() => {
    mutate();
  }, []);



// export default function IdeaList({ ideas }) {
//   var { data: ideas, mutate } = useSWR(apiUrl, fetcher, {
//     initialData: ideas,
//   });
//   const filteredIdeas = ideas?.sort(
//     (a, b) => new Date(b.created_at) - new Date(a.created_at)
//   );
//   useEffect(() => {
//     mutate();
//   }, []);
  return (
    <StateContextProvider>
      <Layout title="アイデア一覧">
        <IdeaForm ideaCreated={mutate} />
          <ul>
            {filteredIdeas &&
              filteredIdeas.map((idea) => (
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
// export async function getStaticProps() {
//   const ideas = await getAllIdeasData()

//   return {
//     props: { ideas },
//     revalidate: 3,
//   };
// }

// export async function getServerSideProps() {
//   const ideas = await getAllIdeasData()
//   const currentUser = await getCurrentUser()
//   console.log(currentUser);

//   return {
//     props: {
//       username: currentUser.usernamm,
//       ideas,
//     },
//     // revalidate: 3,
//   };
// }

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
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
  const ideas = await getAllIdeasData()
  // console.log(typeof(currentUser.id))
  return {
    props: {
      userId: currentUser.id,
      ideas,
    }
  }
}

// export async function getServerSideProps(ctx) {
//   const cookies = nookies.get(ctx)
//   console.log(cookies)
//   return {
//     props: {},
//   }
// }