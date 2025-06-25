import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { sendEmail } from "./email";
import { nextCookies } from "better-auth/next-js";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb", 
    }),
    emailAndPassword:{  enabled:true, requireEmailVerification:true, 
        sendResetPassword:async({user,url})=>{
            await sendEmail({
                to:user.email,
                subject:"Reset your password",
                text: `Click the link to reset your password: ${url}`
            })
        }
    },

    emailVerification:{
        sendOnSignUp:true,
        autoSignInAfterVerification:true,
        callbackURL: "/email-verified",
        sendVerificationEmail:async ({user,token})=>{
            const verificationURL=`${process.env.BETTER_AUTH_URL}/api/auth/custom-verify-email?token=${token}&callbackUrl=/email-verified`;
            await sendEmail({
                to:user.email,
                subject:"Verify your email address",
                text:`Click the link to verify your email address: ${verificationURL}`
            })
        }
    },
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    session:{
        expiresIn:60*60*24*7,
        updateAge:60*60*24*7,
        cookieCache:{
            enabled:true,
            maxAge: 5*60,
        },
    },
    plugins:[nextCookies()]
});





 