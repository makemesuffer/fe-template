import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-3">
      <div className="text-3xl">
        Tailwind - <span className="text-teal-400">ON</span>
      </div>
      <div className="text-3xl">
        Eslint - <span className="text-yellow-400">ON</span>
      </div>
      <div className="text-3xl">
        Husky - <span className="text-red-400">ON</span>
      </div>
    </div>
  )
}

export default Home
