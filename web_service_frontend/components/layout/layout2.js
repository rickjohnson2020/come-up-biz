import Navbar from './navbar'


export default function Layout2(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex flex-1 justify-center mx-auto px-5 max-w-screen-lg">
        {props.children}
      </main>
      <footer className="flex items-center justify-center w-full h-20 text-sm border-t">
        © 2021 Come Up Biz
      </footer>
    </div>
  )
}
