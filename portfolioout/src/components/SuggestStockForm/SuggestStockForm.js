import React, { useState } from "react";
import { Form, Button, Select, InputNumber } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import "./index.css";

const { Option } = Select;
const opts = [
  { value: "Ethical Investing", key: "1" },
  { value: "Growth Investing", key: "2" },
  { value: "Index Investing", key: "3" },
  { value: "Quality Investing", key: "4" },
  { value: "Value Investing", key: "5" },
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
  const [optionsSelected, setOptionsSelected] = useState([]);

  const handleChange = (e) => {
    setOptionsSelected(e);
  };

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
        <Select
          mode="multiple"
          allowClear
          style={{ width: "80%" }}
          onChange={handleChange}
        >
          {opts.map((item) => (
            <Option
              disabled={
                optionsSelected.length > 1
                  ? optionsSelected.includes(item)
                    ? false
                    : true
                  : false
              }
              key={item.key}
            >
              {item.value}
            </Option>
          ))}
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
