import { Stitch } from "mongodb-stitch-browser-sdk";
import React, { useEffect } from 'react';
import { STITCH_APP_ID } from "./Constants";

const handleCallback = async () => {
  const client = Stitch.getAppClient(STITCH_APP_ID);
  if (client.auth.hasRedirectResult) {
    const user = await client.auth.handleRedirectResult();

    console.log(user);
  }

  window.location.pathname = '/';
}

const AuthCallback = () => {
  useEffect(() => {
    handleCallback();
  });

  return <div>Loading...</div>
}

export default AuthCallback;