import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        {session ? (
          <div className="flex flex-col gap-1 items-center">
            <h2>{session?.user?.name}</h2>
            <img
              src={session?.user?.image!}
              className="w-32 h-32 rounded-full"
            />
            <h6>{session?.user?.email!}</h6>
            <span>
              Provider : <b>{session?.user?.provider}</b>
            </span>
            <button onClick={() => signOut()}>sing Out</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>sign In</button>
        )}
      </div>
    </>
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
