import { useEffect } from "react";
import Layout from "../../src/app/Components/Layout/layout"; // Your layout component
import { loadStripe } from "@stripe/stripe-js"; // Ensure to load Stripe outside the component to avoid re-initialization
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Log the stripePromise to ensure it's properly initialized
    console.log("Stripe loaded:", stripePromise);
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Elements>
  );
}

export default MyApp;
