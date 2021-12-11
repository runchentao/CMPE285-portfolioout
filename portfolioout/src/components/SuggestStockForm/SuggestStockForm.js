import React from "react";
import { Form, Input, Button, Select } from "antd";
import "./index.css";

const { Option } = Select;
const options = [
  <Option key="1" value="1">
    Ethical Investing
  </Option>,
  <Option key="2" value="2">
    Growth Investing
  </Option>,
  <Option key="3" value="3">
    Index Investing
  </Option>,
  <Option key="4" value="4">
    Quality Investing
  </Option>,
  <Option key="5" value="5">
    Value Investing
  </Option>,
];

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 10 },
  },
};

const btnLayout = {
  wrapperCol: {
    xs: { offset: 0, span: 18 },
    sm: { offset: 6, span: 18 },
    md: { offset: 6, span: 18 },
    lg: { offset: 0, span: 18 },
  },
};

const SuggestStockForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...formLayout}
      className="form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="horizontal"
      autoComplete="off"
    >
      <Form.Item
        label="Stock Investment Strategy"
        name="strategy"
        rules={[
          { required: true, message: "Please select at least one strategy." },
        ]}
      >
        <Select mode="multiple" allowClear style={{ width: "100%" }}>
          {options}
        </Select>
      </Form.Item>

      <Form.Item
        label="Investment Amount"
        name="investment"
        rules={[
          { required: true, message: "Please enter your investment amount." },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SuggestStockForm;
