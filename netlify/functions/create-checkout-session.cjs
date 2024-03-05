require("dotenv").config();
const stripe = require("stripe")(import.meta.env.STRIPE_SECRET_API_KEY);

exports.handler = async event => {
    try {
        const body = JSON.parse(event.body);
        const items = body.cartItems.map(product => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: product.name
                },
                unit_amount: parseInt(`${product.price}00`)
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: items,
            mode: "payment",
            success_url: `${import.meta.env.FRONT_END_URL}/payment-confirmation?success=true`,
            cancel_url: `${import.meta.env.FRONT_END_URL}/payment-confirmation?canceled=true`
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};