import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  upgradeUserToPro,
  downgradeUserToFree,
  getUserByStripeCustomerId,
} from "@/lib/firebase/firestore";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const firebaseUID = session.metadata?.firebaseUID;
      if (firebaseUID) {
        await upgradeUserToPro(firebaseUID, session.customer as string);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const profile = await getUserByStripeCustomerId(customerId);
      if (profile) {
        await downgradeUserToFree(profile.uid);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}