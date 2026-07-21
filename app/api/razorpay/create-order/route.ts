import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const { amount, currency = "INR", receipt } = body as {
      amount?: number;
      currency?: string;
      receipt?: string;
    };

    if (!amount || amount < 100) {
      return NextResponse.json({ message: "amount must be at least 100 paise" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json({ message: "Razorpay not configured" }, { status: 500 });
    }

    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: (receipt ?? `rcpt_${Date.now()}`).slice(0, 40),
        payment_capture: 1,
      }),
    });

    const data = (await rzpRes.json().catch(() => ({}))) as Record<string, unknown>;

    if (!rzpRes.ok || !data.id) {
      const msg = (data as { error?: { description?: string } })?.error?.description ?? rzpRes.statusText;
      console.error("[create-order] Razorpay error:", msg);
      return NextResponse.json({ message: `Razorpay error: ${msg}` }, { status: 500 });
    }

    return NextResponse.json({
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error("[create-order]", err);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}
