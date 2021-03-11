import React, { useEffect, useState } from "react";
import { subscribeToLogger } from "../utils";
import moment from "moment";

export default function Logger({ initLog }) {
  const [ipfsLog, setIpfsLog] = useState(initLog);

  useEffect(() => {
    const logHandler = event => {
      const entry = `${moment().format()} - ${event.message}`;
      setIpfsLog(prev => [...prev, entry]);
    };

    subscribeToLogger(logHandler);
  }, []);

  return (
    <pre
      style={{
        padding: "1em",
        fontSize: "0.8em",
        backgroundColor: "black",
        color: "lightgreen",
        whiteSpace: "break-spaces",
      }}
    >
      <code>{ipfsLog.map(message => `${message}`)}</code>
    </pre>
  );
}
