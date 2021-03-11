import { Button, Typography, Input } from "antd";
import React, { useState } from "react";
import { downloadIpfsAsset } from "../utils";
import TextArea from "antd/lib/input/TextArea";
import { saveAs } from "file-saver";

export default function UploadText() {
  const [cid, setCid] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await downloadIpfsAsset(cid);

      if (typeof res !== "string") {
        saveAs(res, cid);
        setCid("");
        return;
      }

      setResponse(res);
    } catch (err) {
      console.error(err.message);
      setResponse("Not found");
    }
  };

  const reset = () => {
    setCid("");
    setResponse(null);
  };

  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Download
      </Typography.Title>

      <div>
        <Input
          style={{ width: "600px", maxWidth: "100vw" }}
          value={cid}
          onChange={e => setCid(e.target.value)}
          placeholder="Enter CID..."
        />
      </div>

      <div
        style={{ textAlign: "center", marginTop: "2em", marginBottom: "2em" }}
      >
        <Button type="primary" onClick={handleSubmit}>
          Download
        </Button>

        <Button style={{ marginLeft: "1em" }} onClick={reset}>
          Reset
        </Button>
      </div>

      {response && (
        <>
          <Typography.Title level={3}>Response:</Typography.Title>

          <TextArea
            rows="3"
            style={{ width: "600px", maxWidth: "100vw" }}
            value={response}
          />
        </>
      )}
    </div>
  );
}
