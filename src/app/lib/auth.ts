import NextAuth from "next-auth";
 import { firebaseCert } from "./firebase";
 import Google from "next-auth/providers/google";
 import { FirestoreAdapter } from "@auth/firebase-adapter";
 
 export const { auth, handlers, signIn, signOut } = NextAuth({
   adapter: FirestoreAdapter({
     credential: firebaseCert,
   }),
   providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID, // Usando a variável de ambiente
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Usando a variável de ambiente
    }),
  ],
   events: {},
   callbacks: {},
 });