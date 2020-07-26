import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>
      <ol>
        <li>
          <Link to="/about">About page</Link>
        </li>
        <li>
          <Link to="/protected">Protected page</Link>
        </li>
      </ol>
    </>
  );
}
