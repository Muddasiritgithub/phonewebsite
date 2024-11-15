'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { loadStripe } from "@stripe/stripe-js"; // Make sure to load Stripe outside of the component to avoid re-initialization
import { Elements } from "@stripe/react-stripe-js";
const inter = Inter({ subsets: ["latin"] });


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Elements stripe={stripePromise}>
        {children}
        </Elements>
        </body>
    </html>
  );
}
