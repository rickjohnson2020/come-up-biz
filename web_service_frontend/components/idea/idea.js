import Link from 'next/link'
import { useContext } from "react";
import { StateContext } from "../../context/StateContext";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";


const cookie = new Cookie();


export default function Idea({ idea, ideaDeleted }) {
  const { setSelectedIdea } = useContext(StateContext);
  const deleteIdea = async () => {
    await fetch(`http://127.0.0.1:8000/api/ideas/${idea.idea_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    ideaDeleted();
  };

  // console.log(idea)

  const router = useRouter(); //added
  // const updateIdea = async () => {
  //   await fetch(`http://127.0.0.1:8000/api/idea/${selectedIdea.id}/`,
  //   {
  //     method: "PUT",
  //     body: JSON.stringify({ title: selectedIdea.title }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   })
  //   // const data = await response.json()
  //   // console.log(data)
  //   setSelectedIdea(idea);
  //   router.push(`/ideas/${selectedIdea.id}/edit`);
  // }




  return (
    <div>
      <span>{idea.idea_id}</span>
      {" : "}
      <Link href={`/ideas/${idea.idea_id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {idea.title}
        </span>
      </Link>

      <div className="float-right ml-20">
        <svg
          onClick={() => {
            setSelectedIdea(idea);
            router.push(`/edit/${idea.idea_id}`);
          }}
          className="w-6 h-6 float-left cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <svg
          onClick={deleteIdea}
          className="w-6 h-6 mr-2 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  )
}
