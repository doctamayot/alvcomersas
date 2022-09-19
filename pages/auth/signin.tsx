import {
  getProviders,
  signIn as SignIntoProvider,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";

function SignIn() {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session, status } = useSession();
  const [prov, setProv] = useState<any>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProv(providers as any);
    })();
  }, []);

  console.log(prov);

  return (
    <>
      hola
      {Object.values(prov).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              SignIntoProvider(provider.id, {
                callbackUrl: `${process.env.HOSTNAME}/`,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

// export async function getServerSideProps(): Promise<any> {
//   // const providers = await getProviders();
//   // console.log(providers);

//   return {
//     props: {
//       // providers,
//     },
//   };
// }

export default SignIn;
