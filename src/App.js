import { Button, Divider, notification, Row, Typography } from "antd";
import UploadFile from "./components/UploadFile";
import UploadText from "./components/UploadText";
import Download from "./components/Download";
import Logger from "./components/Logger";
import { useEffect, useState } from "react";
import moment from "moment";
import { subscribeToLogger } from "./utils";

function App() {
  const [ipfsLog, setIpfsLog] = useState([
    `${moment().format()} - Logger started...\n`,
  ]);
  const [logIsOpen, setLogIsOpen] = useState(false);

  useEffect(() => {
    const logHandler = event => {
      const entry = `${moment().format()} - ${event.message}`;
      setIpfsLog(prev => [...prev, entry]);
    };

    subscribeToLogger(logHandler);

    if (!logIsOpen) {
      openNotification();
    }
  }, []);

  const openNotification = () => {
    notification.open({
      key: "logger",

      style: { width: "650px", maxWidth: "100vw", padding: "1em" },
      message: (
        <Typography.Title level={3} className={{ margin: "1em" }}>
          Plugin log output:
        </Typography.Title>
      ),
      duration: null,
      description: <Logger initLog={ipfsLog} />,
      placement: "bottomRight",
    });

    setLogIsOpen(true);
  };

  const closeNotification = () => {
    notification.close("logger");
    setLogIsOpen(false);
  };

  return (
    <Row justify="center" style={{ paddingTop: "3em", paddingBottom: "3em" }}>
      <Typography.Title level={1}>Lisk IPFS Plugin Demo</Typography.Title>

      <Divider
        style={{ visibility: "hidden", padding: "0px", margin: "0px" }}
      />

      <Button
        size="large"
        type="dashed"
        onClick={logIsOpen ? closeNotification : openNotification}
      >
        Toggle logger
      </Button>

      <Divider />

      <UploadFile />

      <Divider />

      <UploadText />

      <Divider />

      <Download />

      <Divider />

      <Typography.Text type="secondary">
        Lisk IPFS Plugin Demo by delegate lemii |{" "}
        <a
          href="https://github.com/Lemii/ipfs-demo"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </Typography.Text>
    </Row>
  );
}

export default App;
