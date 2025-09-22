"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { initiatePayment } from "@/actions/useractions";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "razorpay";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [currentuser, setcurrentuser] = useState({});
  const [payments, setpayments] = useState([]);
  const SearchParamsContext = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
  if (SearchParamsContext.get("paymentdone") == "true") {
    toast('Payment has Been Successfully Made', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
      transition: Bounce,
    }),

    toast('Thanks For Your Donation', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
      transition: Bounce,
    });

  }
  router.push(`/${username}`);
}, [SearchParamsContext]);

  

  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const getdata = async (params) => {
    let u = await fetchuser(username);
    setcurrentuser(u);
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments);
  };

  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount, orderId) => {
    //get the order id
    let a = await initiatePayment(amount, username, paymentform);
    let orderID = a.id;
    var options = {
      "key":currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Get Me A Chai",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="w-full relative flex flex-col justify-center items-center">
        <img
          src={currentuser.coverpic}
          alt="server error"
          className="w-full h-90 object-cover object-center" // ✅ full width, covered, centered
        />
        <div className="absolute -bottom-15 w-25 h-25 ">
          <img
            src={currentuser.profilepic}
            alt="server error"
            className="w-full h-full rounded-full border-1 border-white object-cover" // ✅ circular profile pic
          />
        </div>
      </div>

      <div className="flex flex-col text-center justify-center items-center mt-16 ">
        <div className="font-semibold text-[#abafbd]">@{username}</div>
        <div className="flex text-gray-500 text-center ">
          Supporting visionaries, one idea at a time
        </div>
        <div className="flex text-gray-500 ">
         <span className="font-bold text-[#999caa]">{payments.length}</span>  Supporters. Total <span className="font-bold text-[#999caa]">₹{payments.reduce((a,b)=>a+b.amount,0)} </span> Donations has been raised 
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-3 mx-4 md:mx-14 mb-10 mt-15">
        <div className="supporters bg-gray-900 p-3 rounded-xl w-full md:w-[80%]">
          <h2 className="font-bold text-[#abafbd] text-xl">Supporters</h2>
          <ul className="px-4 pt-4 ">
            {payments.length === 0 && (
              <div className="text-gray-500">
                No supporters yet. Be the first one to support!
              </div>
            )}
            {payments.map((p) => {
              return (
                <li key={p._id} className="pb-2">
                  <div className="flex items-end d gap-1">
                    <Image
                      src="/gifs/user.gif"
                      alt="Network error"
                      width={30}
                      height={30}
                      unoptimized
                    />
                    <span>
                      {" "}
                      {p.name} Donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message {p.message}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="payment bg-gray-900 p-3 rounded-xl w-full md:w-[80%]">
          <h2 className="font-bold text-[#abafbd] text-xl">Make A Payment</h2>
          <div className="">
            <input
              onChange={handlechange}
              value={paymentform.name || ""}
              className="bg-gray-800 rounded-xl p-3 mt-4 w-full"
              name="name"
              type="text"
              placeholder="Enter Name"
            />
            <input
              onChange={handlechange}
              value={paymentform.message || ""}
              className="bg-gray-800 rounded-xl p-3 mt-4 w-full"
              name="message"
              type="text"
              placeholder="Enter Message"
            />
            <input
              onChange={handlechange}
              value={paymentform.amount || ""}
              className="bg-gray-800 rounded-xl p-3 mt-4 w-full"
              name="amount"
              type="number"
              placeholder="Enter Amount"
            />
            <button
              onClick={() => pay(paymentform.amount)}
              type="button"
              className="w-full text-white mt-4 bg-gradient-to-br from-[#2f1255] to-[#351d5d] hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer disabled:bg-gray-500 disabled:from-purple-100 disabled:cursor-default" disabled={paymentform.name?.length<3 || paymentform.message?.length <4 || paymentform.amount?.length <1}
            >
              Pay
            </button>
            <button
              className="cursor-pointer bg-gray-800 rounded-xl p-3 mt-3 mx-2"
              onClick={() => pay(10)}
            >
              Pay ₹10
            </button>
            <button
              className="cursor-pointer bg-gray-800 rounded-xl p-3 mt-3 mx-2"
              onClick={() => pay(20)}
            >
              Pay ₹20
            </button>
            <button
              className="cursor-pointer bg-gray-800 rounded-xl p-3 mt-3 mx-2"
              onClick={() => pay(30)}
            >
              Pay ₹30
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
