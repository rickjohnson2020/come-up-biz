import fetch from 'node-fetch';
import Cookie from "universal-cookie";


const cookie = new Cookie();

// Django APIサーバーURL
const SERVERURL = 'http://127.0.0.1:8000/'

// get each user's profile by username
export async function getUserProfile(username) {
  const res = await fetch(new URL(`${SERVERURL}account/${username}/`))
  const userProfile = await res.json()
  return userProfile
}

export async function getCurrentUser() {
  const res = await fetch(`${SERVERURL}account/auth/user/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
    }
    // credentials: 'include'
  });
  const currentUser = await res.json()
  console.log(currentUser)
  return currentUser
}

// export const getCurrentUser = async () => {
//   const res = await fetch(`${SERVERURL}account/auth/user/`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `JWT ${cookie.get("access_token")}`,
//     }
//     // credentials: 'include'
//   });
//   const currentUser = await res.json()
//   console.log(currentUser)
//   return currentUser
// }