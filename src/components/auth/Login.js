import { Form, Input, Button, PageHeader, Tabs, notification } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router";
import { StoreContext } from "../../context/store";
import { useKorisnikMutations } from "../../hooks";
import styles from "./Registracija.module.css";

const Login = () => {
  const store = useContext(StoreContext);
  const { prijaviSeMutations } = useKorisnikMutations();

  const history = useHistory();

  const onFinish = (values) => {
    const obj = { ...values };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    prijaviSeMutations.mutate(form_data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.data === null) {
          notification.open({
            message: "Aktivirajte nalog",
            description:
              "Poslata vam je elektronska posta sa uputstvom aktivacije naloga! Ili nalog ne postoji",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }
        if (data.data !== null) {
          history.push("/home");
          localStorage.setItem("korisnik_id", data.data.id);
          store.setIsLogedIn(true);
        }
      },
    });
  };

  return (
    <>
      <div className={styles.registerWrap}>
        <div className={styles.prijavaCard}>
          <PageHeader title="Prijava" className={styles.registerTitle} />
          <Form
            onFinish={onFinish}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            autoComplete="off"
            style={{ marginTop: "5%" }}
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "13%" }}
              >
                Prijavi se
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export { Login };
