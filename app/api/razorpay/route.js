import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (request) => {
  await connectDB();
  let body = await request.formData();
  body = Object.fromEntries(body);

  // check if the payment is present in the database
  let p = await Payment.findOne({ oid: body.razorpay_order_id });

  if (!p) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

//fetch the user razorpay secret id from the database
let user = await User.findOne({username:p.to_user})
let secret=user.razorpaysecret
let id=user.razorpayid

  // verify the payment signature
  let xx = validatePaymentVerification(
    {
      "order_id": body.razorpay_order_id,
     "payment_id": body.razorpay_payment_id},
      body.razorpay_signature,
    secret
  );

  if (xx) {
    const updatedPayment = await Payment.findOneAndUpdate(
  { oid: body.razorpay_order_id },
  { done: "true" },
  { new: true }
) 

return NextResponse.redirect(
  `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
)



  } else {
    return NextResponse.json({success:false, message:"Payment verification failed"})
  }
};
