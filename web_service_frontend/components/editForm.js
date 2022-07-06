import { useContext } from "react";
import { StateContext } from "../context/StateContext";
// import Cookie from "universal-cookie";
import Link from "next/link"
// import Idea from "../idea/idea"
import { useRouter } from "next/router";


// const cookie = new Cookie();

export default function EditForm({ ideaCreated }) {
  const { selectedIdea, setSelectedIdea } = useContext(StateContext);

  const router = useRouter();


  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `http://127.0.0.1:8000/api/idea/${selectedIdea.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedIdea.title }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setSelectedIdea({ id: 0, title: "" });
    ideaCreated();
  };

  return (
    <div>
      <form onSubmit={update}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedIdea.title}
          onChange={(e) =>
            setSelectedIdea({ ...selectedIdea, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedIdea.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
}
