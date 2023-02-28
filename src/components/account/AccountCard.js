import { Form, Image, Input, Modal } from "antd";
import { Row, Button } from "antd";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useKorisnikMutations } from "../../hooks";
import styles from "./AccountCard.module.css";
import { EditUserForm } from "./forms/edit-user-form";

const AccountCard = ({ klijent, uloga }) => {
  const client = useQueryClient();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isChangePassVisible, setIsChangePassVisible] = useState(false);

  const { izmeniKorisnikaMutations, potvrdiEmailMutation } =
    useKorisnikMutations();

  const info = () => {
    Modal.info({
      title: "Trazili ste promenu email adrese!",
      content: (
        <div>
          <p>Poslat vam je email sa daljim instrukcijama</p>
        </div>
      ),
      onOk() {},
    });
  };

  const potvrdiEmail = (values) => {
    var form_data = new FormData();
    for (var key in values) {
      form_data.append(key, values[key]);
    }
    potvrdiEmailMutation.mutate(form_data, {
      onSuccess: () => {
        setIsChangePassVisible(false);
        info();
      },
    });
  };

  const onEditProfile = (values) => {
    const obj = { ...values };
    const idRef = values.id;
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    izmeniKorisnikaMutations.mutate(
      { id: idRef, variables: form_data },
      {
        onSuccess: () => {
          setIsEditVisible(false);
          client.invalidateQueries("korisnik-id");
        },
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.accountCard}>
        <div className={styles.ajdi}>
          <div className={styles.picture}>
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div className={styles.usernameTitle}>
            {klijent && klijent[0].username ? klijent[0].username : "-"}
          </div>
        </div>
        <div className={styles.infoContain}>
          <div>
            <span style={{ fontWeight: "bold" }}>Username</span>:{" "}
            <span style={{ color: "white" }}>
              {klijent && klijent[0].username ? klijent[0].username : "-"}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Ime i prezime</span>:{" "}
            <span style={{ color: "white" }}>
              {klijent && klijent[0].ime_prezime ? klijent[0].ime_prezime : "-"}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Telefon</span>:{" "}
            <span style={{ color: "white" }}>
              {klijent && klijent[0].br_telefona ? klijent[0].br_telefona : "-"}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Email</span>:{" "}
            <span style={{ color: "white" }}>
              {klijent && klijent[0].email ? klijent[0].email : "-"}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Datum rodjenja</span>:{" "}
            <span style={{ color: "white" }}>
              {klijent && klijent[0].datum_rodjenja
                ? klijent[0].datum_rodjenja
                : "-"}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Uloga</span>:{" "}
            <span style={{ color: "white" }}>{uloga ? uloga.naziv : "-"}</span>
          </div>
        </div>
      </div>
      <Row justify="end" style={{ marginBottom: "3%" }}>
        <Button
          type="primary"
          style={{ padding: "0px 50px", backgroundColor: "green" }}
          onClick={() => {
            setIsEditVisible(true);
          }}
        >
          Edit
        </Button>
      </Row>
      <Row justify="end" style={{ marginTop: "10px", marginBottom: "3%" }}>
        <Button
          type="primary"
          style={{ padding: "0px 50px", backgroundColor: "orange" }}
          onClick={() => {
            setIsChangePassVisible(true);
          }}
        >
          Izmeni lozinku
        </Button>
      </Row>
      <Modal
        title="Izmeni podatke"
        width={500}
        visible={isEditVisible}
        onCancel={() => {
          setIsEditVisible(false);
        }}
        footer={null}
      >
        <EditUserForm
          callback={(values) => {
            onEditProfile(values);
          }}
          user={klijent && klijent[0] ? klijent[0] : {}}
        />
      </Modal>
      <Modal
        title="Izmeni lozinku"
        width={500}
        visible={isChangePassVisible}
        onCancel={() => {
          setIsChangePassVisible(false);
        }}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{ span: 12 }}
          autoComplete="off"
          onFinish={potvrdiEmail}
        >
          <Form.Item
            label="Email"
            name="primalac"
            rules={[
              {
                required: true,
                message: "Unesite email addresu",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Potvrdi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export { AccountCard };
