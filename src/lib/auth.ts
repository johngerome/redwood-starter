import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { captcha } from "better-auth/plugins";
import { db } from "@/db/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  trustedProxies: ["cloudflare"],
  plugins: [
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: env.TURNSTILE_SECRET_KEY,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    rounds: 8,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void env.EMAIL_QUEUE.send({
        type: "VERIFY_USER_EMAIL",
        email: user.email,
        url,
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    callbackURL: "/portal",
  },
  user: {
    fields: {
      name: "firstName",
    },
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
        fieldName: "firstName",
        input: true,
      },
      lastName: {
        type: "string",
        required: true,
        fieldName: "lastName",
        input: true,
      },
      middleName: {
        type: "string",
        required: false,
        fieldName: "middleName",
        input: true,
      },
      nameSuffix: {
        type: "string",
        required: false,
        fieldName: "nameSuffix",
        input: true,
      },
    },
  },
});
