import { paymentApi, verifyPaymentApi, getRazorpayKeyApi } from "../services/api.js";

export function useRazorpay() {
  const openPayment = async ({ onSuccess, onFailure }) => {
    try {
      // Step 1 — Fetch Razorpay key from backend
      const keyRes = await getRazorpayKeyApi();
      const keyId = keyRes.data.keyId;

      // Step 2 — Create order on backend
      const res = await paymentApi();
      const { order } = res.data;

      // Step 3 — Check Razorpay script is loaded
      if (!window.Razorpay) {
        alert("Razorpay failed to load. Check your internet connection.");
        return;
      }

      // Step 4 — Open Razorpay checkout modal
      const options = {
        key: keyId,                // ← from backend, not frontend env
        amount: order.amount,
        currency: order.currency,
        name: "Want Crush number ??",
        description: "abhi dekhe apni crush ka number",
        order_id: order.id,

        handler: async function (response) {
          try {
            await verifyPaymentApi({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });
            onSuccess && onSuccess(response);
          } catch (err) {
            console.error("Verification failed", err);
            onFailure && onFailure(err);
          }
        },

        prefill: { name: "", email: "" },
        theme: { color: "#F28970" },
        modal: {
          ondismiss: () => console.log("Payment modal closed by user"),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        onFailure && onFailure(response.error);
      });

      rzp.open();

    } catch (err) {
      console.error("Payment setup failed", err);
      onFailure && onFailure(err);
    }
  };

  return { openPayment };
}
