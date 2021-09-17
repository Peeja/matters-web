import { useRead } from "../hooks/useRead";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

const QUERY = {
  "@describe": "?id",
  "@where": { "@id": "?id" },
};

const Home: NextPage = () => {
  const allData = useRead(QUERY);
  return allData ? <ReactJson src={allData} /> : <>…</>;
};

export default Home;
