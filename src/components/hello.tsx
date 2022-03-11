import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { ComponentsProvider } from "@looker/components";
import {
  ExtensionContext,
  ExtensionProvider,
} from "@looker/extension-sdk-react";
import * as Mailbroker from "../common/mailbroker";

const Hello = (props) => {
  console.log("TIN DBG >>>>>>>>ExtensionContext", ExtensionContext);
  const { extensionSDK } = useContext(ExtensionContext);

  useEffect(() => {
    const sendEmail = async () => {
      let authToken = await Mailbroker.getAuthToken();
      let response = await Mailbroker.sendEmail(
        authToken,
        "62e4753c-d1d6-4ac3-bed2-2d4e51476d0d",
        "thomas.ines@autodesk.com",
        extensionSDK
      );
      console.log("TIN DBG >>>>>>> response", response);
    };
    sendEmail();
  }, []);

  return (
    <ExtensionProvider>
      <ComponentsProvider>
        <h1>Hello, {props.data}</h1>
      </ComponentsProvider>
    </ExtensionProvider>
  );
};

export default Hello;
