import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  const priceMap: Record<string, string> = {
    trial: "price_1SW7dJ3KLPr03pPgnG2FzFht",
    monthly: "price_1SW7gC3KLPr03pPgBTq180Xa",
    daily: "price_1SW7hM3KLPr03pPgGtB3qwrC",
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'fps'],
    mode: 'payment',
    line_items: [{ price: priceMap[plan], quantity: 1 }],
    success_url: `${req.headers.get('origin')}/dashboard?success=1`,
    cancel_url: `${req.headers.get('origin')}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}