import Client from "./client";

const isProd = process.env.NODE_ENV === "production";

const Preview = () => {
  return <Client isProd={isProd} />;
};

export default Preview;
