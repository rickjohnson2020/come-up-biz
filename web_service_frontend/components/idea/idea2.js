import Link from 'next/link'

export default function Idea({ idea }) {
  return (
    <>
    <Link href={`/ideas/${idea.idea_id}`}>
      <div className="p-4 cursor-pointer sm:w-1/2 lg:w-1/4">
        <img alt="idea" className="object-cover" src={idea.image} />
        <div className="text-center my-4">
          <p>{idea.title}</p>
        </div>
      </div>
    </Link>
    <Link href={`/users/${idea.created_by.username}`}>
      <div>{idea.created_by.username}</div>
    </Link>
    </>
  )
}
