import { MeldClone } from "@m-ld/m-ld";
import { createContext, useContext } from "react";

const MeldContext = createContext<MeldClone | undefined>(undefined);
export const MeldProvider = MeldContext.Provider;
export const useMeld = (): MeldClone | undefined => useContext(MeldContext);
