import MemDown from "memdown";
import { clone, GraphSubjects, MeldClone, uuid } from "@m-ld/m-ld";
import { IoRemotes, MeldIoConfig } from "@m-ld/m-ld/dist/socket.io";
import { useEffect, useState } from "react";

const config: MeldIoConfig = {
  "@id": uuid(),
  "@domain": "test.example.org",
  genesis: false,
  io: { uri: "http://localhost:4000" },
};

const useMeld = () => {
  const [meld, setMeld] = useState<MeldClone>();
  const [allData, setAllData] = useState<GraphSubjects>();

  useEffect(() => {
    (async () => {
      setMeld(await clone(new MemDown(), IoRemotes, config));
    })();
  }, []);

  useEffect(() => {
    if (meld) {
      const subscription = meld.follow(async (update, state) => {
        console.log("clone 2", "has update", update);
        const all = await state.read({
          "@describe": "?id",
          "@where": { "@id": "?id" },
        });
        setAllData(all);
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [meld]);

  return allData;
};

export default useMeld;
