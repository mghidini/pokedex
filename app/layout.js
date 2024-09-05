import '../styles/globals.css'

const layout = ({children}) => {
  return (
    <html lang="en">
      <head>
        <title>Pokédex App</title>
        <meta name="description" content="A Next.js application" />
      </head>
      <body>
        <header>
          <nav className='bg-slate-700 p-6'>
          <p className='text-white text-xl'>Gotta Fetch'Em All!</p>
          </nav>
        </header>

        <div className="flex flex-col flex-wrap items-center justify-center p-6 border-8 m-20 bg-slate-700">
          <main className='w-full flex-grow'>
            {children}
          </main>
        </div>

        <div>
          <footer className='bg-slate-700 p-10'>
            <p className='text-center text-white'>&copy; 2024 Matilde Ghidini</p>
          </footer>
        </div>

      </body>
    </html>
  )
}

export default layout