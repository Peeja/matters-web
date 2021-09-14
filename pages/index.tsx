import useMeld from "../hooks/useMeld";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

const Home: NextPage = () => {
  const allData = useMeld();
  return allData ? <ReactJson src={allData} /> : <>…</>;
};

export default Home;
