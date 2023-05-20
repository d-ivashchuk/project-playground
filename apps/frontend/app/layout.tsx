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
    <ClerkProvider>
      <html lang="en-US">
        <head />
        <body>
          <Providers>
            <RootStyleRegistry>
              <Shell>{children}</Shell>
            </RootStyleRegistry>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
