import { useState, useEffect } from "react";

type LightState = "RED" | "YELLOW" | "RED_YELLOW" | "GREEN";

type Durations = {
  green: number;
  yellow: number;
};

export default function useTrafficLight(durations: Durations) {
  const [mainState, setMainState] = useState<LightState>("GREEN");
  const [sideState, setSideState] = useState<LightState>("RED");
  const [tick, setTick] = useState<number>(0);

  const ticker = () => {
    setTimeout(() => {
      setTick((prev) => {
        if (prev < durations.green * 2) return prev + 1;
        else return 1;
      });
      ticker();
    }, 1000);
  };

  useEffect(() => {
    ticker();
  }, []);

  useEffect(() => {
    if (tick <= durations.green - durations.yellow) {
      setMainState("GREEN");
      setSideState("RED");
    } else if (tick <= durations.green) {
      setSideState("RED_YELLOW");
    } else if (tick <= durations.green + durations.yellow) {
      setMainState("RED");
      setSideState("GREEN");
    } else {
      setMainState("RED_YELLOW");
    }
  }, [tick]);

  return [mainState, sideState];
}
