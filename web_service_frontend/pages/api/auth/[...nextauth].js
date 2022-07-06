import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import TwitterProvider from "next-auth/providers/twitter"


const settings = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
  ],
  callbacks: {
    async signIn(user, account, profile, email)
  }
}