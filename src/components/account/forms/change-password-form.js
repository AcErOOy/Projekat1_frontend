import { Button, Form, Input, PageHeader } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router";
import { StoreContext } from "../../../context/store";
import { useKorisnikMutations } from "../../../hooks";
import styles from "../../auth/Registracija.module.css";

const ChangePasswordForm = () => {
  const store = useContext(StoreContext);
  const history = useHistory();

  const { izmeniLozinkuMutations } = useKorisnikMutations();

  const onFinish = (values) => {
    // console.log(store.user)
    const userStringified = localStorage.getItem("user");
    const user = JSON.parse(userStringified);
    const obj = { ...user, ...values };
    const idRef = user.id;
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    izmeniLozinkuMutations.mutate(
      { id: idRef, variables: form_data },
      {
        onSuccess: () => {
          history.push("/account");
        },
      }
    );
  };
  return (
    <div className={styles.registerWrap}>
      <div className={styles.prijavaCard} style={{ background: "white" }}>
        <PageHeader title="Promena lozinke" className={styles.registerTitle} />
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
            label="Nova Lozinka"
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
      </div>
    </div>
  );
};

export { ChangePasswordForm };
