"use client"
import React from "react"
import { store } from "@pay/store/store"
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}