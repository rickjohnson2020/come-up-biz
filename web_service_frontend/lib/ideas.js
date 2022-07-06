import fetch from 'node-fetch'

// Django APIサーバーURL
const SERVERURL = 'http://127.0.0.1:8000/'

// Get the list of all the ideas (using for home page)
export async function getAllIdeasData() {
  const res = await fetch(new URL(`${SERVERURL}api/idea/`))
  const ideas = await res.json()
  return ideas
}

// Get ID of all ideas
export async function getAllIdeaIds() {
  const res = await fetch(new URL(`${SERVERURL}api/idea/`))
  const ideas = await res.json()
  console.log(ideas); // for checking
  return ideas.map((idea) => {
    return {
      params: {
        idea_id: String(idea.idea_id),
      },
    }
  })
}

// Get idea detail (using for idea detail page)
export async function getIdeaData(idea_id) {
  const res = await fetch(new URL(`${SERVERURL}api/idea/${idea_id}/`))
  const idea = await res.json()
  return idea
}

// Get each user's idea list (using for each user's profile page)
export async function getIdeasByUser(username) {
  const res = await fetch(new URL(`${SERVERURL}api/${username}/`))
  const userIdeas = await res.json()
  return userIdeas
}

// Get author of all the ideas
export async function getAllIdeaAuthors() {
  const res = await fetch(new URL(`${SERVERURL}api/idea/`))
  const ideas = await res.json()
  return ideas.map((idea) => {
    return {
      params: {
        created_by: String(idea.created_by.username),
      },
    }
  })
}
