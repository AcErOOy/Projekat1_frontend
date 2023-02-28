import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  useFetchKorisnikId,
  useGrupeMutations,
  useZadaciMutations,
} from "../../hooks";
import { useFetchGrupe } from "../../hooks/fetch/use-fetch-grupe";
import { useFetchUloga } from "../../hooks/fetch/use-fetch-uloga";
import { ZadatakTable } from "./ZadatakTable";

const Home = () => {
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isEditGroup, setIsEditGroup] = useState(false);
  const [rok, setDateString] = useState();
  const [grupa_id, setGrupaId] = useState();
  const [taskCreate] = useForm();

  const client = useQueryClient();

  const { dodajGrupuMutation, izmeniGrupuMutation, obrisiGrupuMutation } =
    useGrupeMutations();
  const { dodajZadatak } = useZadaciMutations();

  const korisnik_id_string = localStorage.getItem("korisnik_id");
  const { data: korisnik, isSuccess } = useFetchKorisnikId(
    ["korisnik-id", korisnik_id_string],
    {
      onSuccess: () => {
        console.log("data", data);
      },
    }
  );
  const { data: uloga } = useFetchUloga(
    [
      "uloga-id",
      korisnik && korisnik[0] && korisnik[0].uloga_id
        ? korisnik[0].uloga_id
        : "1",
    ],
    {
      onSuccess: () => {
        console.log("uloga", uloga);
      },
      enabled: isSuccess,
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Naziv Grupe",
      dataIndex: "naziv",
      key: "naziv",
      sorter: (a, b) => a.naziv.localeCompare(b.naziv),
    },
    {
      title: "Akcije",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <>
          <Space size={"middle"}>
            {uloga &&
              (uloga.naziv === "administrator" ||
                uloga.naziv === "rukovodilac") && (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsCreateTask(true);
                      setGrupaId(record.id);
                    }}
                  >
                    Dodaj zadatak
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setGrupaId(record.id);
                      setIsEditGroup(true);
                    }}
                  >
                    Izmeni
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      obrisiGrupuMutation.mutate(record.id, {
                        onSuccess: () => {
                          client.invalidateQueries("GRUPE_ZADATAKA");
                        },
                      });
                    }}
                  >
                    Obrisi
                  </Button>
                </>
              )}
          </Space>
        </>
      ),
    },
  ];
  const uploadProps = {
    name: "file",
    accept: "*",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onChange = (date, dateString) => {
    setDateString(dateString);
  };
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };
  const onFinish = (values) => {
    const obj = { ...values };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    dodajGrupuMutation.mutate(form_data, {
      onSuccess: () => {
        console.log("dodaj SUCCESSFULL!");
        client.invalidateQueries("GRUPE_ZADATAKA");
      },
    });
  };

  const izmeniGrupuFinished = (values) => {
    const obj = {
      id: grupa_id,
      naziv: values.naziv,
    };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    izmeniGrupuMutation.mutate(form_data, {
      onSuccess: () => {
        setIsEditGroup(false);
        client.invalidateQueries("GRUPE_ZADATAKA");
      },
    });
  };

  const onFinishTaskCreate = (values) => {
    const korisnik_id_string = localStorage.getItem("korisnik_id");
    const korisnik_id = parseInt(korisnik_id_string);
    const obj = { ...values, rok, grupa_id, korisnik_id };
    // console.log(obj);
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    console.log(values);
    dodajZadatak.mutate(form_data, {
      onSuccess: () => {
        setIsCreateTask(false);
        client.invalidateQueries("DOHVATI_ZADATKE");
        console.log("Dodaj Zadatak Uspelo!");
        taskCreate.resetFields();
      },
    });
  };

  const { data } = useFetchGrupe("GRUPE_ZADATAKA", {
    onSucess: () => {
      console.log("fetch Sucessfull", data);
    },
  });
  return (
    <>
      {uloga &&
        (uloga.naziv === "administrator" || uloga.naziv === "rukovodilac") && (
          <Button
            type="primary"
            onClick={() => {
              setIsCreateGroup(true);
            }}
            style={{ margin: "10px 0px" }}
          >
            Kreiraj grupu
          </Button>
        )}
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ZadatakTable grupaId={record.id} />,
        }}
        dataSource={data}
        size="middle"
        bordered
        rowKey="id"
      />
      <Modal
        title="Napravi Grupu"
        width={500}
        visible={isCreateGroup}
        onCancel={() => {
          setIsCreateGroup(false);
        }}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish}>
          <Form.Item label="Naziv grupe" name="naziv">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sacuvaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Napravi zadatak"
        width={500}
        visible={isCreateTask}
        onCancel={() => {
          setIsCreateTask(false);
        }}
        footer={null}
      >
        <Form name="basicTask" onFinish={onFinishTaskCreate} form={taskCreate}>
          <Form.Item label="Naslov" name="naslov">
            <Input />
          </Form.Item>
          <Form.Item label="Opis" name="opis">
            <Input />
          </Form.Item>
          <DatePicker onChange={onChange} />
          <Form.Item label="Prioritet" name="prioritet">
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="file"
            valuePropName="file"
            getValueFromEvent={getFile}
          >
            <Upload
              {...uploadProps}
              beforeUpload={() => {
                /* update state here */
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit">
              Sacuvaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        onCancel={() => {
          setIsEditGroup(false);
        }}
        title="Izmeni grupu"
        visible={isEditGroup}
        footer={null}
      >
        <Form name="izmeniGrupu" onFinish={izmeniGrupuFinished}>
          <Form.Item label="Naziv grupe" name="naziv">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sacuvaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
  //
};

export { Home };
