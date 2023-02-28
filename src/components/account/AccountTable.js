import { Button, Form, Input, Modal, Space, Table, notification } from "antd";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { StoreContext } from "../../context/store";
import { useKorisnikMutations } from "../../hooks";
import { CreateUserForm } from "./forms/create-user-form";
import { EditUserForm } from "./forms/edit-user-form";

const AccountTable = ({ korisnici }) => {
  const client = useQueryClient();
  const store = useContext(StoreContext);

  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditUserVisible, setIsEditUserVisible] = useState(false);
  const [isPassChangeVisible, setIsPassChangeVisible] = useState(false);
  const {
    registrujSeMutations,
    izmeniKorisnikaMutations,
    aktivirajNalogMutation,
    potvrdiEmailMutation,
    obrisiKorisnikaMutations,
  } = useKorisnikMutations();

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

  const onFinish = (values) => {
    const obj = { ...values };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    registrujSeMutations.mutate(form_data, {
      onSuccess: () => {
        setIsModalVisible(false);
        client.invalidateQueries("svi-korisnici");
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
  };

  const onEditUser = (values) => {
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
          setIsEditUserVisible(false);
          client.invalidateQueries("svi-korisnici");
        },
      }
    );
  };

  const potvrdiEmail = (values) => {
    var form_data = new FormData();
    for (var key in values) {
      form_data.append(key, values[key]);
    }
    potvrdiEmailMutation.mutate(form_data, {
      onSuccess: () => {
        setIsPassChangeVisible(false);
        info();
      },
    });
  };

  const columns = [
    {
      title: "Korisnicko ime",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ime i prezime",
      dataIndex: "ime_prezime",
      key: "ime_prezime",
      sorter: (a, b) => a.ime_prezime.localeCompare(b.ime_prezime),
    },
    {
      title: "Broj telefona",
      dataIndex: "br_telefona",
      key: "br_telefona",
    },
    {
      title: "Datum rodjenja",
      dataIndex: "datum_rodjenja",
      key: "datum_rodjenja",
    },
    {
      title: "Uloga",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Akcije",
      dataIndex: "akcije",
      key: "akcije",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => {
              setIsEditUserVisible(true);
              setUser(record);
            }}
          >
            Izmeni
          </Button>
          <Button
            type="primary"
            onClick={() => {
              store.setUser(record);
              setIsPassChangeVisible(true);
              localStorage.setItem("user", JSON.stringify(record));
              //ovde ide funkcija za slanje maila
            }}
          >
            Izmeni lozinku
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              obrisiKorisnikaMutations.mutate(record.id, {
                onSuccess: () => {
                  client.invalidateQueries("svi-korisnici");
                },
              });
            }}
          >
            Obrisi
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        style={{ margin: "10px 0px" }}
        type="primary"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Kreiraj korisnika
      </Button>
      <Table dataSource={korisnici} columns={columns} rowKey="id" />
      <Modal
        title="Napravi korisnika"
        width={500}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
      >
        <CreateUserForm
          callback={(values) => {
            onFinish(values);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Izmeni korisnika"
        width={500}
        visible={isEditUserVisible}
        onCancel={() => {
          setIsEditUserVisible(false);
          setUser(null);
        }}
        on
        footer={null}
      >
        <EditUserForm
          callback={(values) => {
            onEditUser(values);
            setUser(null);
          }}
          user={user}
        />
      </Modal>
      <Modal
        title="Izmeni lozinku"
        width={500}
        visible={isPassChangeVisible}
        onCancel={() => {
          setIsPassChangeVisible(false);
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

export { AccountTable };
