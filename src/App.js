import { Divider, Row, Typography } from "antd";
import UploadFile from "./components/UploadFile";
import UploadText from "./components/UploadText";
import Download from "./components/Download";

function App() {
  return (
    <Row justify="center" style={{ paddingTop: "3em", paddingBottom: "3em" }}>
      <Typography.Title level={1}>Lisk IPFS Plugin Demo</Typography.Title>

      <Divider />

      <UploadFile />

      <Divider />

      <UploadText />

      <Divider />

      <Download />

      <Divider />

      <Typography.Text type="secondary">Lisk IPFS Plugin Demo</Typography.Text>
    </Row>
  );
}

export default App;
