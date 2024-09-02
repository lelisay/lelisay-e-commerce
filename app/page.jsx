"use client";

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

function Page() {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session?.user?.email) {
        
        try {

          if (session?.user?.role === "admin") {
            setUserRole("admin")
          }else{

            const response = await fetch('/api/Users/getUserRole', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: session.user.email }),
            });
  
            if (!response.ok) {
              throw new Error('Failed to fetch role');
            }
  
            const roleData = await response.json();
            setUserRole(roleData.role);
          }
          
        } catch (error) {
          console.error('Error fetching user role:', error);
        } finally {
          setLoadingRole(false);
        }
      }
    };

    fetchUserRole();
  }, [session?.user?.email]);

  if (status === 'loading' || loadingRole) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in {session?.user?.role}</p>;
  }

  return (
    <div className='dark:text-secondary-foreground font-suse'>
      <p>Signed in as {userRole}</p>
      <p>From session {session?.user?.role}</p>
    </div>
  );
}

export default Page;
