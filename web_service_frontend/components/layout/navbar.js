// // import { signIn, signOut, useSession } from 'next-auth/client'
// import Link from 'next/link'
// import React from "react"
//
//
// const Button = React.forwardRef(({ onClick, href }, ref) => {
//   return (
//     <a className="bg-pink-400 text-white px-4 py-2 rounded-md" href={href} onClick={onClick} ref={ref}>
//       公開
//     </a>
//   )
// })
//
//
//
//
// export default function Navbar() {
//   // const [session] = useSession()
//
//   return (
//     <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
//       <Link href="/">
//         <a className="text-4xl font-bold text-red-300">ComeUpBiz</a>
//       </Link>
//       <nav className="ml-auto">
//         <Link href="/idea-list">
//           <a className="mr-5">キャンセル</a>
//         </Link>
//         <Link href="/edit" passHref>
//           <Button />
//         </Link>
//       </nav>
//     </header>
//   )
// }
