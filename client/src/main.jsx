import { CssBaseline } from '@mui/material';
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { LayoutLoader } from './components/layout/Loaders.jsx';
import store from './redux/store.js';

import Body from './body.jsx';



// Root rendering with global Suspense
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
      <Suspense fallback={<LayoutLoader/>}>
        <Body/>
      </Suspense>
      </div>
    </HelmetProvider>
    </Provider>
  </StrictMode>
);