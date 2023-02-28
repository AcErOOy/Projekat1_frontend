import { Button, Form, Input, InputNumber, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useFetchUloge } from "../../../hooks";
const { Option } = Select;

const EditUserForm = ({ callback, user }) => {
  const [formEditUser] = useForm();
  const [ulogaId, setUlogaId] = useState(3);
  const onFinish = (values) => {
    callback({...user, ...values, uloga_id: ulogaId });
    formEditUser.resetFields();
  };

  const { data: ulogeData } = useFetchUloge("uloge");
  return (
    <Form
      name="basic"
      form={formEditUser}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinish}
      initialValues={user}
    >
      <Form.Item
        label="Korisnicko Ime"
        name="username"
        rules={[
          {
            required: true,
            message: "Unesite korisnicko ime!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ime i prezime"
        name="ime_prezime"
        rules={[
          {
            required: true,
            message: "Unesite ime i prezime!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Broj telefona" name="br_telefona">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Uloga">
        <Select
          style={{ width: "100%", marginBottom: "10px" }}
          defaultValue={ulogaId}
          onChange={(value) => {
            setUlogaId(value);
          }}
        >
          {ulogeData ? (
            ulogeData.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.naziv}
              </Option>
            ))
          ) : (
            <Option value={null}>NULL</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Izmeni
        </Button>
      </Form.Item>
    </Form>
  );
};

export { EditUserForm };
