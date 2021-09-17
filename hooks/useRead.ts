import { useMeld } from "../contexts/meld";
import { useEffect, useState } from "react";
import { GraphSubjects, Read } from "@m-ld/m-ld";

/**
 * Reads a query against the m-ld clone in the context.
 *
 * @param query The query to run "live" against the m-ld clone. NOTE: Be sure to
 * always pass the same `query` instance when you intend to read the same query.
 * In particular, do not write the query as a literal inside the component where
 * it will be reinstantiated on every render. This will cause `useRead` to
 * unsubscribe and re-subscribe infinitely.
 * @returns The current result of reading the `query` against the m-ld clone, or
 * `undefined` while the query is still resolving.
 */
export const useRead = <R extends Read = Read>(
  query: R,
): GraphSubjects | undefined => {
  const [result, setResult] = useState<GraphSubjects | undefined>(undefined);
  const meld = useMeld();

  useEffect(() => {
    if (meld) {
      const subscription = meld.read(
        async (state) => {
          setResult(await state.read(query));
        },
        async (_update, state) => {
          setResult(await state.read(query));
        },
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [meld, query]);

  return result;
};
