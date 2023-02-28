import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { useFetchUloge } from "../../../hooks";
const { Option } = Select;

const CreateUserForm = ({ callback }) => {
  const [ulogaId, setUlogaId] = useState(3);
  const [datumRodjenja, setDatumRodjenja] = useState();
  const onFinish = (values) => {
    callback({ ...values, uloga_id: ulogaId, datum_rodjenja: datumRodjenja });
  };
  const { data: ulogeData } = useFetchUloge("uloge");
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      autoComplete="off"
      onFinish={onFinish}
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
        label="Lozinka"
        name="password"
        rules={[
          {
            required: true,
            message: "Unesite lozinku!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Ponovljena lozinka"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Unesite ponovljenu lozinku!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("Obe lozinke moraju da budu iste!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
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

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Unesite svoju email adresu",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Broj telefona" name="br_telefona">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Datum rodjenja" name={"datum_rodjenja"}>
        <DatePicker
          style={{ width: "100%" }}
          onChange={(date, dateString) => {
            setDatumRodjenja(dateString);
          }}
        />
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
          Kreiraj
        </Button>
      </Form.Item>
    </Form>
  );
};

export { CreateUserForm };
