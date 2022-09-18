import {
    getProviders,
    signIn as SignIntoProvider,
    useSession,
  } from "next-auth/react";
  
  function signIn({ providers }: any) {
    //eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: session, status } = useSession();
  
    
  
    return (
      <>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
    );
  }
  
  export async function getServerSideProps() {
    const providers = await getProviders();
  
    return {
      props: {
        providers,
      },
    };
  }
  
  export default signIn;