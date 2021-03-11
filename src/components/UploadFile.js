import { Form, Upload, Button, Typography } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function UploadFile() {
  const [form] = Form.useForm();
  const [response, setResponse] = useState(null);

  const handleSubmit = async formData => {
    const file = formData.file.file.originFileObj;

    let res;
    try {
      res = await uploadFile(file);
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
        Upload file
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
          <Form.Item name="file" rules={[{ required: true }]}>
            <Upload
              style={{ padding: "3em" }}
              multiple={false}
              maxCount={1}
              customRequest={() => undefined}
              iconRender={() => null}
            >
              <Button icon={<UploadOutlined />}>Select file to upload</Button>
            </Upload>
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
