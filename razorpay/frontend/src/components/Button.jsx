import { useState } from "react";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";
import { createPaymentOrder, verifyPayment } from "../services/api";

const PaymentComponent = () => {
  const { isLoading, Razorpay } = useRazorpay();
  const [paying, setPaying] = useState(false);

  const handlePayment = async () => {
    setPaying(true);
    try {
      // Step 1 — create a fresh Razorpay order from your backend
      const res = await createPaymentOrder();
      const order = res.data.order;

      // Step 2 — open Razorpay with the real order_id from the backend
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ShopApp",
        description: "Order Payment",
        order_id: order.id,  // fresh order_id from Razorpay via your backend

        handler: async (response) => {
          // Step 3 — verify the payment on your backend
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful!");
          } catch (err) {
            toast.error("Payment verification failed. Contact support.");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#e94560",
        },

        modal: {
          ondismiss: () => {
            toast("Payment cancelled.", { icon: "ℹ️" });
          },
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to initiate payment.";
      toast.error(msg);
    } finally {
      setPaying(false);
    }
  };

  return (
    <button
      className="btn-primary"
      onClick={handlePayment}
      disabled={isLoading || paying}
      style={{ width: "100%" }}
    >
      {paying ? "Initiating..." : isLoading ? "Loading..." : "Pay Now"}
    </button>
  );
};

export default PaymentComponent;
