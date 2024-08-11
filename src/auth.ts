import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const providerMap = authConfig.providers.map((provider) => {
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
});
