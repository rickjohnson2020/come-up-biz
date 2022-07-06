import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { StateContext } from "../context/StateContext";
// import Cookie from "universal-cookie";
import Link from "next/link"
import Layout from '../components/layout/layout'
import StateContextProvider from "../context/StateContext";

// import Idea from "../components/idea/idea"

// const cookie = new Cookie();

function EditIdea() {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchIdea();
    async function fetchIdea() {
      if (!id) return;
      const { data } = await fetch(
        `http://127.0.0.1:8000/api/idea/${selectedIdea.id}/`
      )
      setSelectedIdea(data);
    }
  }, [id]);

  if (!selectedIdea) return null;
  function onChange(e) {
    setSelectedIdea(() => ({ ...idea, [e.target.name]: e.target.value }));
  }

  return (
      <Layout title={selectedIdea.title}>
        <form onSubmit={update}>
          <input
            className="text-black mb-8 px-2 py-1"
            type="text"
            value={selectedIdea.title}
            onChange={onChange}
          />
          <button
            type="submit"
            className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
          >update</button>
        </form>
      </Layout>
  );
}

export default EditIdea;
