import { useContext, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Close, Input, Overlay } from "@/components";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext, ModalContext, NotificationContext } from "@/context";

// const config = {
//   reference: new Date().getTime().toString(),
//   email: "briggskvngzz@gmail.com",
//   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
// };

export default function Checkout({
  showCheckout,
  handleShowCheckout,
}: {
  showCheckout: boolean;
  handleShowCheckout: Function;
}) {
  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => handleKey(e));
  // });

  // const handleKey = (e) => {
  //   e.code === "Escape" && handleShowCheckout();
  // };

  return createPortal(
    showCheckout && (
      <div className={""}>
        <Overlay show={showCheckout} disableOnClick={false} />
        <div className={""}>
          <span
            className={"fixed top-1 right-1"}
            onClick={() => handleShowCheckout()}
            title="hide modal"
          >
            <Close close={() => handleShowCheckout()} />
          </span>
          <CheckoutHook />
        </div>
      </div>
    ),
    document.getElementById("checkout")!
  );
}

const CheckoutHook = () => {
  const { user } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === "success") {
      triggerNotification("payment successful");
    } else {
      triggerNotification("payment failed");
    }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    triggerNotification("checkout closed");
  };

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: "",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
  });

  const getAmount = (amount: number) => {
    setConfig((prev) => ({
      ...prev,
      reference: new Date().getTime().toString(),
      email: user?.email,
      amount,
    }));
  };

  const initializePayment = usePaystackPayment(config);

  const navigateLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div>
      <Input type="number" setValue={getAmount} />
      <button
        onClick={() => {
          user
            ? initializePayment(onSuccess, onClose)
            : triggerModal(
                "pleae log in to initialize payment",
                () => navigateLogin,
                () => triggerModal
              );
        }}
      >
        make payment
      </button>
    </div>
  );
};
