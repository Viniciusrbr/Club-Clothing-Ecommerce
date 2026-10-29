const Stripe = require('stripe');
const { initializeApp } = require('firebase/app');
const { collection, getDocs, getFirestore } = require('firebase/firestore');

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: '2026-09-30.endive',
});

const db = getFirestore(
  initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  })
);

const getProductsById = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  const productsById = new Map();

  querySnapshot.forEach((doc) => {
    for (const product of doc.data().products ?? []) {
      productsById.set(product.id, product);
    }
  });

  return productsById;
};

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const productsById = await getProductsById();

    const items = [];

    for (const cartProduct of body.products ?? []) {
      const product = productsById.get(cartProduct.id);
      const quantity = Number(cartProduct.quantity);

      if (!product || !Number.isInteger(quantity) || quantity < 1) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid cart' }),
        };
      }

      items.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      });
    }

    if (items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid cart' }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: 'payment',
      success_url: `${process.env.FRONT_END_URL}/payment-confirmation?success=true`,
      cancel_url: `${process.env.FRONT_END_URL}/payment-confirmation?canceled=true`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
