import { Button, Typography, Box } from "@mui/material";

import useTrafficLight from "../../hooks/useTrafficLight";
import usePedestrianTrafficLight from "../../hooks/usePedestrianTrafficLight";

const TrafficLightSystem = () => {
  const [pedStatus, pedAPI] = usePedestrianTrafficLight(5);
  const [mainRoad, sideRoad] = useTrafficLight({
    green: 5,
    yellow: 2,
  });

  return (
    <Box>
      <Typography variant="h4">Traffic Control System</Typography>
      <Box>
        <Typography>Main Road: {mainRoad}</Typography>
        <Typography>Side Road: {sideRoad}</Typography>
        <hr />
        <Typography>Pedestrian: {pedStatus}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={pedAPI.request}>
        Request Pedestrian Crossing
      </Button>
    </Box>
  );
};

export default TrafficLightSystem;
