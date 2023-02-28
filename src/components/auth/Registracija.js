import {
  Form,
  Input,
  Checkbox,
  Button,
  InputNumber,
  DatePicker,
  PageHeader,
  Row,
  Col,
  notification,
} from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import { useKorisnikMutations } from "../../hooks";
import styles from "./Registracija.module.css";

const Registracija = () => {
  const history = useHistory();
  const [datumRodjenja, setDatumRodjenja] = useState();
  const { registrujSeMutations, aktivirajNalogMutation } =
    useKorisnikMutations();

  const onFinish = (values) => {
    const obj = { ...values, uloga_id: 3, datum_rodjenja: datumRodjenja };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    registrujSeMutations.mutate(form_data, {
      onSuccess: () => {
        console.log("Successfull!");
        history.push("/login");
        const email = obj.email;
        var form_data_e = new FormData();
        form_data_e.append("email", email);
        aktivirajNalogMutation.mutate(form_data_e, {
          onSuccess: () => {
            notification.open({
              message: "Aktivirajte nalog",
              description:
                "Poslata vam je elektronska posta sa uputstvom aktivacije naloga!",
              onClick: () => {
                console.log("Notification Clicked!");
              },
            });
          },
        });
      },
    });
    console.log(obj);
  };

  return (
    <div className={styles.registerWrap}>
      <div className={styles.registerCard}>
        <PageHeader title="Registracija" className={styles.registerTitle} />
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
                    new Error(
                      "Obe lozinke moraju da budu iste!"
                    )
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

          <Form.Item label="Datum rodjenja">
            <DatePicker
              onChange={(date, dateString) => {
                setDatumRodjenja(dateString);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Accept terms and conditions of use</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Registruj se
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Registracija };
