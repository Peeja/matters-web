import { useRead } from "../hooks/useRead";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Construct } from "@m-ld/m-ld";

// react-json-view can't load in SSR
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

// This is a dummy query for now, chosen to demonstrate that updates come
// through, without pulling too much data (eg, describing all entities), which
// currently times out in m-ld.
const QUERY: Construct = {
  "@construct": { "@id": "?id", name: "?name" },
  "@where": {
    "@id": "?id",
    "http://peeja.com/purl/matters/omnifocus/o/name": "?name",
  },
};

const Home: NextPage = () => {
  const allData = useRead(QUERY);
  return allData ? <ReactJson src={allData} /> : <>Loading…</>;
};

export default Home;
