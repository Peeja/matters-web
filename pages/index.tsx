import { useRead } from "../hooks/useRead";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Describe } from "@m-ld/m-ld";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

// Show all tasks which are incomplete.
const QUERY: Describe = {
  "@describe": "?id",
  "@where": {
    "@id": "?id",
    "http://peeja.com/purl/matters/omnifocus/o/completed": {
      "@id": "http://peeja.com/purl/matters/omnifocus/o/never",
    },
  },
};

const Home: NextPage = () => {
  const allData = useRead(QUERY);
  return allData ? <ReactJson src={allData} /> : <>Loading…</>;
};

export default Home;
