'use client';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import store from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider store={store}>
          <MantineProvider
            theme={{
              colors: {
                'font-weak': [
                  '#fff2f5',
                  '#ece6e7',
                  '#cfcdcd',
                  '#b2b2b2',
                  '#9a9a9a',
                  '#8b8b8b',
                  '#848484',
                  '#737171',
                  '#686465',
                  '#5f5457',
                ],
                'font-hard': [
                  '#fef2f5',
                  '#eae6e7',
                  '#cdcdcd',
                  '#b2b2b2',
                  '#9a9a9a',
                  '#8b8b8b',
                  '#848484',
                  '#717171',
                  '#676465',
                  '#5e5457',
                ],
              },
            }}
          >
            <Notifications position="bottom-left" />
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
