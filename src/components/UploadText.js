import { Form, Button, Typography } from "antd";
import React, { useState } from "react";
import { uploadText } from "../utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import TextArea from "antd/lib/input/TextArea";

export default function UploadText() {
  const [form] = Form.useForm();
  const [response, setResponse] = useState(null);

  const handleSubmit = async formData => {
    const text = formData.text;

    let res;

    try {
      res = await uploadText(text);
    } catch (err) {
      res = err.message;
    }

    setResponse(res);
  };

  const reset = () => {
    form.resetFields();
    setResponse(null);
  };

  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Upload text
      </Typography.Title>

      {response ? (
        <>
          <Typography.Title level={3}>Response:</Typography.Title>

          <SyntaxHighlighter language="json">
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>

          <Button type="primary" onClick={reset} style={{ marginTop: "2em" }}>
            Reset
          </Button>
        </>
      ) : (
        <Form
          layout={"vertical"}
          form={form}
          onFinish={handleSubmit}
          style={{ textAlign: "center" }}
        >
          <Form.Item name="text" rules={[{ required: true }]}>
            <TextArea rows="3" style={{ width: "600px", maxWidth: "100vw" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
