const { default: axios } = require("axios");

export const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    let clientId = "XQxjEJw0C9YYFKybjrGFcKcDJdOfiK43";
    let clientSecret = "EKLS97nhynauSJ2d";
    let authHeader = `Basic ${btoa(clientId + ":" + clientSecret)}`;

    let axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
        Accept: "application/json",
      },
    };

    axios
      .post(
        "https://developer-dev.api.autodesk.com/authentication/v2/token?grant_type=client_credentials&scope=data:read",
        {},
        axiosConfig
      )
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        resolve(res);
      })
      .catch((error) => {
        console.log("TIN DBG >>>>>>> sendEmail error: ", error);
        reject(`sendEmail > error:  ${error}`);
      });
  });
};

export const sendEmail = (authToken, emailId, recepient, extensionSDK) => {
  return new Promise(async (resolve, reject) => {
    if (!authToken || !recepient) {
      reject("sendEmail failed: at least one empty parameter");
      return;
    }

    // var postData = {
    //   id: emailId,
    //   email: recepient,
    // };

    // let axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${authToken}`,
    //     "Access-Control-Allow-Origin": `https://looker.autodesk.com`,
    //   },
    // };

    // axios
    //   .post(
    //     "https://op585jnlth.execute-api.us-west-2.amazonaws.com/Prod/sendemail",
    //     postData,
    //     axiosConfig
    //   )
    //   .then((res) => {
    //     console.log("RESPONSE RECEIVED: ", res);
    //     resolve(res);
    //   })
    //   .catch((error) => {
    //     console.log("TIN DBG >>>>>>> sendEmail error: ", error);
    //     reject(`sendEmail > error:  ${error}`);
    //   });

    const result = await extensionSDK.fetchProxy(
      "https://op585jnlth.execute-api.us-west-2.amazonaws.com/Prod/sendemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: emailId,
          email: recepient,
        }),
      }
    );
    console.error("Result", result);
    resolve(result);
  });
};
