import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-3">
      <div className="text-3xl">
        Tailwind - <span className="text-teal-500">ON</span>
      </div>
    </div>
  );
};

export default Home;
