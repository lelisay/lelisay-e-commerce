import React from 'react';

const PublicPage = () => {
  return (
    <div className="dark:text-secondary-foreground font-suse">
      <h1>Public Page</h1>
      <div className="text-large font-extrabold">largest</div>
      <div className="text-middle font-semibold">Middle</div>
      <div className="text-small font-medium">least</div>
    </div>
  );
};

export default PublicPage;
