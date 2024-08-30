"use client"; // This directive makes the component a Client Component

import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      {/* Additional content for authenticated users */}
    </div>
  );
}

export default MyComponent;
