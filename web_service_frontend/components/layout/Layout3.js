import Head from "next/head";
import Link from 'next/link'



export default function Layout3({ children, title = "Default title"}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
        <Link href="/">
          <a className="text-4xl font-bold text-red-300">ComeUpBiz</a>
        </Link>
        <nav className="ml-auto">
          <Link href="/about">
            <a className="mr-5">ComeUpBizとは</a>
          </Link>
          <Link href="/login">
            <a className="mr-5">ログイン</a>
          </Link>
          <Link href="/signup">
            <button>新規登録</button>
          </Link>
        </nav>
      </header>
      <main className="container flex flex-1 justify-center mx-auto px-5 max-w-screen-lg">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full h-20 text-sm border-t">
        © 2021 ComeUpBiz
      </footer>
    </div>
  )
}