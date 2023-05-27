import Providers from '../client';
import Shell from '../comoponents/shell';
import RootStyleRegistry from './emotion';
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <ClerkProvider>
          <Providers>
            <RootStyleRegistry>
              <Shell>{children}</Shell>
            </RootStyleRegistry>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
