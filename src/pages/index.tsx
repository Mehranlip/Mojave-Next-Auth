import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="home">
      <div className="h-screen w-screen flex items-center justify-center ">
        <div className="box-home w-96 p-5">
          {session ? (
            <div className="flex flex-col gap-1 items-center">
              <img
                src={session?.user?.image!}
                className="w-32 h-32 rounded-full"
              />
              <h2 className="name-user mt-2">{session?.user?.name}</h2>
              <h6 className="email-user mt-1 text-white font-normal">
                {session?.user?.email!}
              </h6>
              <span>
                <b className="text-white font-normal">Provider :</b>{" "}
                <b className="bg-gray-700 text-gray-100 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded  mt-1">
                  {session?.user?.provider}
                </b>
              </span>
              <button
                className="signout text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  "
                onClick={() => signOut()}
              >
                sing Out
              </button>
            </div>
          ) : (
            <button className="" onClick={() => signIn()}>
              sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);

  return {
    props: {
      session,
    },
  };
}
