/**
 *
 * Asynchronously loads the component for AboutPage
 *
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingPage } from '../../components/LoadingPage';

export const AboutPage = lazyLoad(
  () => import('./index'),
  module => module.AboutPage,
  { fallback: <LoadingPage /> },
);
