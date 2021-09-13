import type { NextPage } from "next";
import dynamic from "next/dynamic";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <ReactJson src={{ abc: 123 }} />;
};

export default Home;
