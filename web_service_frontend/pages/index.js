// import Auth from '../components/Auth'
import Head from 'next/head'
import Image from 'next/image'
import Layout3 from '../components/layout/Layout3'
import Idea from '../components/idea/idea2'
// import styles from '../styles/Home.module.css'
import { getAllIdeasData } from '../lib/ideas'

export default function Home({ ideas }) {
  return (
    <Layout3 title="ComeUpBiz">
      <div>
        <div className="flex justify-center flex-col items-center mb-10">
          <div className="text-lg mb-3">Ideas List</div>
          <div className="border w-14"></div>
        </div>
        <div className="flex flex-wrap -m-4 mb-5">
          {ideas && ideas.map((idea) => <Idea key={idea.id} idea={idea} />)}
        </div>
      </div>
    </Layout3>
  )
}

export async function getStaticProps() {
  const ideas = await getAllIdeasData()
  return {
    props: { ideas },
    revalidate: 3,
  }
}
