import React from "react";

import DefaultTemplate from "../templates/default";
import Head from "../components/head";

const NotFoundPage = () => (
  <DefaultTemplate pageInfo={{ pageName: "missing" }}>
    <Head title="404: Not found" />
    <h1>Not Found</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </DefaultTemplate>
);

export default NotFoundPage;
