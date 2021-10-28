import { useMeld } from "../contexts/meld";
import { useEffect, useState } from "react";
import {
  GraphSubjects,
  MeldClone,
  MeldReadState,
  MeldUpdate,
  Read,
} from "@m-ld/m-ld";
import { Observable } from "rxjs";

type LatestMeldState = {
  /** The latest state itself. */
  state: MeldReadState;

  /** The update which was applied to the previous state to reach this one. */
  update?: MeldUpdate;
};

/**
 * Creates an Observable which yields the latest state of the given m-ld clone
 * as it updates, along with the updates themselves.
 * @param meld A m-ld clone to watch
 * @returns An Observable of:
 * - `state`: The current state and the state after each future update.
 * - `update`: The update which caused the latest state change. (Missing for
 *   first emission, because there was no previously observed state.)
 */
const statesOfMeldClone = (meld: MeldClone) =>
  new Observable<LatestMeldState>((subscriber) => {
    subscriber.next({ state: meld });
    return meld.follow((update, state) => {
      subscriber.next({ update, state });
    });
  });

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
      // Note: If the clone receives updates in rapid succession, this approach
      // may cause a lot of sudden rerendering. It may help to pipe this through
      // debounceTime() to collect those updates into a single rerender. But
      // until we have a good use case to use to prove the best solution, we'll
      // keep the code simple.
      statesOfMeldClone(meld).subscribe(async ({ state }) => {
        setResult(await state.read(query));
      });
    }
  }, [meld, query]);

  return result;
};
