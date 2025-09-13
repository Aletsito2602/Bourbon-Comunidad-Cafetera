"use client";

import dynamic from "next/dynamic";

const AuthenticateWithRedirectCallback = dynamic(
    () => import("@clerk/nextjs").then((m) => m.AuthenticateWithRedirectCallback),
    { ssr: false }
);

export default function SSOCallback() {
    return (
        <AuthenticateWithRedirectCallback
            signInForceRedirectUrl="/auth-callback"
            signUpForceRedirectUrl="/auth-callback"
        />
    );
};
