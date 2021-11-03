import { useRead } from "../hooks/useRead";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Construct } from "@m-ld/m-ld";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

const pattern = {
  "@id": "?id",
  "http://peeja.com/purl/matters/omnifocus/o/name": "?name",
};

// Show all tasks which are incomplete.
const QUERY: Construct = {
  "@construct": pattern,
  "@where": {
    ...pattern,
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
