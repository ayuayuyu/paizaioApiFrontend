import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import FixCode from "./FixCode";
import CrushCode from "./CrushCode";

function Room() {
  return (
    <Container>
      <CrushCode />
      {/* <FixCode /> */}
      {/* <WebSocket /> */}
    </Container>
  );
}

export default Room;
