import React, { useRef, useState, useEffect, useCallback } from "react";
import Select from "react-select";
import Head from "next/head";

import { Switch } from "@material-tailwind/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const PaypalSubscribeButtons = (props) => {
  console.log(props);
  const ButtonWrapper = ({ type }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const [{ isPending }] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          intent: "subscription",
        },
      });
    }, [type]);

    return (
      <div>
        <PayPalButtons
          createSubscription={(data, actions) => {
            return actions.subscription
              .create({
                plan_id: props.planId,
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onCancel={(data, actions) => {
            props.nextStep();
          }}
          onError={(error) => {
            alert(error);
          }}
          style={{
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "paypal",
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          //   "client-id": { CLIENT_ID },
          "client-id":
            "AYN77t5pJatyyL9JZqhugyTnLUAmaJVxvtK00pEiO3HcKyg9hX_GbSCI5KpQ6w4wNoBR7Ito4Ekb7lQh",
          components: "buttons",
          intent: "subscription",
          vault: true,
        }}
      >
        <ButtonWrapper type="subscription" />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalSubscribeButtons;
