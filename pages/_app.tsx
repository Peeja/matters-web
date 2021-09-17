import { MeldProvider } from "../contexts/meld";
import MemDown from "memdown";
import { clone, MeldClone, uuid } from "@m-ld/m-ld";
import { IoRemotes, MeldIoConfig } from "@m-ld/m-ld/dist/socket.io";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const config: MeldIoConfig = {
  "@id": uuid(),
  "@domain": "test.example.org",
  genesis: false,
  io: { uri: "http://localhost:4000" },
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [meld, setMeld] = useState<MeldClone>();

  useEffect(() => {
    (async () => {
      console.log("cloning");
      setMeld(await clone(new MemDown(), IoRemotes, config));
    })();
  }, []);

  return (
    <MeldProvider value={meld}>
      <Component {...pageProps} />
    </MeldProvider>
  );
}

export default MyApp;
