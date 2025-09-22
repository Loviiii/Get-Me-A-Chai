"use server";
import Razorpay from "razorpay";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

export const initiatePayment = async (amount, to_user, paymentform, secret) => {
  await connectDB();
  const user = await User.findOne({ username: to_user }).lean();
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret:  user.razorpaysecret,
  });

  let options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  const x = await instance.orders.create(options);

  // Create a  payment object which shows pending payment in the database
  Payment.create({
    amount: amount,
    oid: x.id,
    to_user: to_user,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username }).lean();
  return JSON.parse(JSON.stringify(u));
};

export const fetchpayments = async (username) => {
  await connectDB();
  let dbpayments = await Payment.find({ to_user: username, done: true }).sort({ createdAt: -1 }).limit(8).lean();
  return JSON.parse(JSON.stringify(dbpayments));
};

export const updateprofile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username }).lean();
    if (u) {
      return { error: "Username already exists" };
    }
  }
  await User.updateOne({ email: ndata.email }, ndata);
};
