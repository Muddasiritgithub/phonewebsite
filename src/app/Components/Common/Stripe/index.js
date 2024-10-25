import React from 'react';
import axios from 'axios'; // Axios import karein

const Checkout = () => {
    const handleClick = async () => {
        const price = 2000; // Yahan apni price set karein (e.g. $20 = 2000 cents)

        try {
            // Axios ko Stripe session create karne ke liye call karein
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`, {
                price, // Price ko request body mein send karein
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const session = response.data;

            // URL ko browser mein redirect karein
            window.location.href = session.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div>
            <h4>Stripe Checkout</h4>
            <button onClick={handleClick}>
                Pay Now
            </button>
        </div>
    );
};

export default Checkout;
