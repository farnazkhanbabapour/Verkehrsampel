import { useState, useEffect, useMemo } from "react";

type LightState = "GO" | "STOP";

export default function usePedestrianTrafficLight(durations: number) {
  const [state, setState] = useState<LightState>("STOP");
  let timeout: ReturnType<typeof setTimeout>;

  const api = useMemo(
    () => ({
      request: () => {
        if (state === "STOP") {
          timeout = setTimeout(() => {
            setState("STOP");
            clearTimeout(timeout);
          }, durations * 1000);
          setState("GO");
        }
      },
    }),
    []
  );

  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return [state, api] as const;
}
