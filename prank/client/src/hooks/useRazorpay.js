import { paymentApi, verifyPaymentApi } from "../services/api.js";

export function useRazorpay() {
  const openPayment = async ({ onSuccess, onFailure }) => {
    try {
      // Step 1 — Create order on backend, get order id
      const res = await paymentApi();
      const { order } = res.data;

      // Step 2 — Check Razorpay script is loaded
      if (!window.Razorpay) {
        alert("Razorpay failed to load. Check your internet connection.");
        return;
      }

      // Step 3 — Open Razorpay checkout modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, // in paise
        currency: order.currency,
        name: "Want Crush number ??",
        description: "abhi dekhe apni crush ka number",
        order_id: order.id,

        handler: async function (response) {
          // Step 4 — Verify payment on backend after success
          try {
            await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            onSuccess && onSuccess(response);
          } catch (err) {
            console.error("Verification failed", err);
            onFailure && onFailure(err);
          }
        },

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#F28970",
        },

        modal: {
          ondismiss: () => {
            console.log("Payment modal closed by user");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      // Handle payment failure inside the modal
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        onFailure && onFailure(response.error);
      });

      rzp.open();
    } catch (err) {
      console.error("Order creation failed", err);
      onFailure && onFailure(err);
    }
  };

  return { openPayment };
}
