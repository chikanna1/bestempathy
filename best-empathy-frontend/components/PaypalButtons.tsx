import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
import Head from "next/head";

const PaypalButtons = (props) => {
  <Head>
    <script src="https://www.paypal.com/sdk/js?client-id=AYN77t5pJatyyL9JZqhugyTnLUAmaJVxvtK00pEiO3HcKyg9hX_GbSCI5KpQ6w4wNoBR7Ito4Ekb7lQh" />
  </Head>;
  const paypalOptions = {
    clientId: props.clientId,
    currency: "USD",
    vault: true,
  };

  const buttonStyles = {
    shape: "rect",
    color: "blue",
    layout: "vertical",
    label: "paypal",
  };

  return (
    <div>
      <PayPalButton
        options={{
          vault: true,
          "client-id": props.clientId,
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: props.planId,
          });
        }}
        onApprove={(data) => {
          console.log(data);
          props.successfulPayment();
          // props.nextStep();
        }}
        onError={(data) => {
          props.canceledPaypalPayment();
        }}
        onCancel={(data) => {
          console.log("Error");
          props.canceledPaypalPayment();
        }}
      />
    </div>
  );
};

export default PaypalButtons;
