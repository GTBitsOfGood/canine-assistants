import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useRouter } from 'next/router';

export function useSessionManager(WrappedComponent, props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setShouldRender(false); // Don't render the WrappedComponent during loading
    } else if (status === 'unauthenticated' || session === null) {
        console.log("User status is: " + status)
        router.push('/login'); // Redirect to /login
    } else {
      setShouldRender(true); // Render the WrappedComponent when session is loaded
    }
  }, [session, status, router]);

  if (!shouldRender) {
    return <LoadingAnimation />;
  }

  // Render the WrappedComponent with session data
  return <WrappedComponent {...props} session={session} />;
}
