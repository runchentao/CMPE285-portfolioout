import React from "react";
import { Form, Button, Select, InputNumber } from "antd";
import { DollarOutlined } from "@ant-design/icons";
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

const SuggestStockForm = (props) => {
  const onFinish = (values) => {
    props.onSubmit(values);
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
        <Select allowClear style={{ width: "80%" }}>
          {options}
        </Select>
      </Form.Item>

      <Form.Item
        label="Investment Amount"
        name="investment"
        rules={[
          { required: true, message: "Please enter your investment amount." },
          {
            type: "number",
            min: 5000,
            message: "Invalid input, minimum investment is 5000 USD",
          },
        ]}
      >
        <InputNumber addonBefore={<DollarOutlined />} />
      </Form.Item>

      <Form.Item {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Start Invest
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SuggestStockForm;
