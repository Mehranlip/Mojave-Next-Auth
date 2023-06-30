import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {session?.user?.name}
      <img
        src={session?.user?.image!}
        alt="user imge"
        className="w-32 h-32 rounded-full"
      />
      {session ? (
        <button onClick={() => signOut()}>sing Out</button>
      ) : (
        <button onClick={() => signIn()}>sign In</button>
      )}
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
