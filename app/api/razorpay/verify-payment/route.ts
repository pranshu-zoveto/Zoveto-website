import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Invalid body" }, { status: 400 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body as Record<string, string>;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required" },
        { status: 400 },
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    const generated = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    let valid = false;
    try {
      const a = Buffer.from(generated, "utf8");
      const b = Buffer.from(razorpay_signature.trim(), "utf8");
      valid = a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      valid = false;
    }

    if (!valid) {
      return NextResponse.json({ message: "Signature verification failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error("[verify-payment]", err);
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}
