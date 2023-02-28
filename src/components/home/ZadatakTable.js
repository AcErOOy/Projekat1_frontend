import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Space,
  Table,
  DatePicker,
  InputNumber,
  Form,
  Upload,
  message,
  Select,
  Row,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  useFetchKomentari,
  useFetchKorisnikId,
  useFetchZadaci,
  useFetchZadaciZaIzvrsioca,
  useKomentariMutations,
  useKorisnikMutations,
  useZadaciMutations,
} from "../../hooks";
import { useQueryClient } from "react-query";
import { useFetchPoUlozi } from "../../hooks/fetch/use-fetch-po-ulozi";
import { useFetchIzvrsioci } from "../../hooks/fetch/use-fetch-izvrsioci";
import { useFetchUloga } from "../../hooks/fetch/use-fetch-uloga";
const { Option } = Select;

const ZadatakTable = ({ grupaId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isKomentarModalVisible, setIsKomentarModalVisible] = useState(false);
  const [isEditTask, setIsEditTask] = useState(false);
  const [isDodajIzvrsioca, setIsDodajIzvrsioca] = useState(false);
  const [isKomentarVisible, setIsKOmentarVisible] = useState(false);
  const [izmeniKomentarVisible, setIzmeniKomentarVisible] = useState(false);
  const [komentarAvailable, setKomentarAvailable] = useState(false);
  const [rok, setDateString] = useState();
  const [zadatak, setZadatak] = useState();
  const [zadatak_id, setZadatakId] = useState();
  const [korisnik_id, setKorisnikId] = useState();
  const [komentarHolder, setKomentarHolder] = useState();

  const korisnikId = localStorage.getItem("korisnik_id");
  // console.log(korisnikId)

  const client = useQueryClient();
  const { izmeniZadatak, obrisiZadatak } = useZadaciMutations();

  const { data: dataIzvrsioci } = useFetchPoUlozi(["IZVRSIOCI", "izvrsilac"]);
  const {
    dodajKomentarMutation,
    obrisiKomentarMutation,
    obrisiJedanKomentarMutation,
    izmeniKomentarMutation,
  } = useKomentariMutations();
  const { dodajVezuZadatakIzvrsiocMutation } = useKorisnikMutations();
  const { data: izvrsiociZaZadatak } = useFetchIzvrsioci(
    ["IZVRSIOCI_ZA_ZADATAK", zadatak_id],
    {
      enabled: zadatak_id ? true : false,
    }
  );

  const { data: komentariZadatak } = useFetchKomentari(
    ["KOMENTARI_ZA_ZADATAK", zadatak_id],
    {
      enabled: isKomentarVisible,
    }
  );

  const korisnik_id_string = localStorage.getItem("korisnik_id");
  const { data: korisnik } = useFetchKorisnikId(
    ["korisnik-id", korisnik_id_string],
    {
      onSuccess: () => {
        console.log("data", data);
      },
    }
  );
  const { data: uloga } = useFetchUloga(
    ["uloga-id", korisnik && korisnik[0].uloga_id ? korisnik[0].uloga_id : "1"],
    {
      onSuccess: () => {
        console.log("uloga", uloga);
      },
    }
  );
  const columnsKomentari = [
    {
      title: "Komentar",
      dataIndex: "komentar",
      key: "komentar",
    },
    {
      title: "Vreme",
      dataIndex: "vreme",
      key: "vreme",
      sorter: (a, b) => new Date(a.vreme) - new Date(b.vreme),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Akcije",
      dataIndex: "akcije",
      key: "akcije",
      render: (_, record) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setIzmeniKomentarVisible(true);
                setKomentarHolder(record);
              }}
            >
              Izmeni
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                obrisiJedanKomentarMutation.mutate(record.id, {
                  onSuccess: () => {
                    client.invalidateQueries("KOMENTARI_ZA_ZADATAK");
                  },
                });
              }}
            >
              Obrisi
            </Button>
          </>
        );
      },
    },
  ];

  const columnsIzvrsioci = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ime i prezime",
      dataIndex: "ime_prezime",
      key: "ime_prezime",
      sorter: (a, b) => a.ime_prezime.localeCompare(b.ime_prezime),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Akcije",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Space size={"middle"}>
          {korisnikId == record.id && (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setIsKomentarModalVisible(true);
                  setKorisnikId(id);
                }}
              >
                Ostavi komentar
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  obrisiKomentarMutation.mutate(id);
                }}
              >
                Obrisi sve komentare
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];
  const columns = [
    {
      title: "Naslov",
      dataIndex: "naslov",
      key: "naslov",
      sorter: (a, b) => a.naslov.localeCompare(b.naslov),
    },
    {
      title: "Opis zadatka",
      dataIndex: "opis",
      key: "opis",
      sorter: (a, b) => a.opis.localeCompare(b.opis),
    },
    {
      title: "Rukovodilac",
      dataIndex: "korisnik_id",
      key: "korisnik_id",
    },
    {
      title: "Rok",
      dataIndex: "rok",
      key: "rok",
      sorter: (a, b) => new Date(a.rok) - new Date(b.rok),
    },
    {
      title: "Prioritet",
      dataIndex: "prioritet",
      key: "prioritet",
      sorter: (a, b) => a.prioritet - b.prioritet,
    },
    {
      title: "Fajlovi",
      dataIndex: "fajl",
      key: "fajl",
    },
    {
      title: "Grupa",
      dataIndex: "grupa_id",
      key: "grupa_id",
    },
    {
      title: "Akcije",
      dataIndex: "akcije",
      key: "akcije",
      render: (_, record) => (
        <Space size={"middle"}>
          {uloga &&
            (uloga.naziv === "administrator" ||
              uloga.naziv === "rukovodilac") && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    setZadatak(record);
                    setIsEditTask(true);
                  }}
                >
                  Izmeni zadatak
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    obrisiZadatak.mutate(record.id, {
                      onSuccess: () => {
                        client.invalidateQueries("DOHVATI_ZADATKE");
                      },
                    });
                  }}
                >
                  Obrisi
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setZadatakId(record.id);
                    setIsDodajIzvrsioca(true);
                  }}
                >
                  Dodaj izvrsioca
                </Button>
              </>
            )}
          <Button
            type="primary"
            onClick={() => {
              setZadatakId(record.id);
              setIsModalVisible(true);
            }}
          >
            Izvrsioci
          </Button>
          {uloga &&
            (uloga.naziv === "administrator" ||
              uloga.naziv === "rukovodilac") && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    setZadatakId(record.id);
                    setIsKOmentarVisible(true);
                  }}
                >
                  Komentari
                </Button>
                <Checkbox
                  onChange={(e) => {
                    let val;
                    if (e.target.checked) {
                      val = 1;
                    } else if (!e.target.checked) {
                      val = 0;
                    }
                    let obj = { ...record, gotov: val };
                    var form_data = new FormData();
                    for (var key in obj) {
                      form_data.append(key, obj[key]);
                    }
                    izmeniZadatak.mutate(form_data, {
                      onSuccess: () => {
                        client.invalidateQueries("DOHVATI_ZADATKE");
                      },
                    });
                  }}
                >
                  Gotovo
                </Checkbox>
                <Checkbox
                  onChange={(e) => {
                    let val;
                    if (e.target.checked) {
                      val = 1;
                    } else if (!e.target.checked) {
                      val = 0;
                    }
                    let obj = { ...record, otkazan: val };
                    var form_data = new FormData();
                    for (var key in obj) {
                      form_data.append(key, obj[key]);
                    }
                    izmeniZadatak.mutate(form_data, {
                      onSuccess: () => {
                        client.invalidateQueries("DOHVATI_ZADATKE");
                      },
                    });
                  }}
                >
                  Otkazan
                </Checkbox>
              </>
            )}
        </Space>
      ),
    },
  ];
  const dodajKomentarFinish = (values) => {
    const obj = { ...values, zadatak_id, korisnik_id };
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    dodajKomentarMutation.mutate(form_data, {
      onSuccess: () => {
        setIsKomentarModalVisible(false);
      },
    });
  };
  const izmeniKomentarFinish = (values) => {
    const obj = { ...komentarHolder, ...values };
    delete obj.email;
    if (!obj.komentar) {
      obj.komentar = " ";
    }
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    izmeniKomentarMutation.mutate(form_data, {
      onSuccess: () => {
        setIzmeniKomentarVisible(false);
        client.invalidateQueries("KOMENTARI_ZA_ZADATAK");
      },
    });
  };
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };
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
  const onFinishTaskEdit = (values) => {
    const korisnik_id_string = localStorage.getItem("korisnik_id");
    const korisnik_id = parseInt(korisnik_id_string);
    const obj = {
      ...zadatak,
      rok: rok,
      naslov: values.naslov,
      opis: values.opis,
      fajl: values.file,
      prioritet: values.prioritet,
      grupa_id: grupaId,
      korisnik_id,
    };
    console.log(obj);
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    // console.log(values);
    izmeniZadatak.mutate(form_data, {
      onSuccess: () => {
        setIsEditTask(false);
        client.invalidateQueries("DOHVATI_ZADATKE");
      },
    });
  };
  const { data } = useFetchZadaci(["DOHVATI_ZADATKE", grupaId]);
  const { data: loggedKorisnik, isSuccess } = useFetchKorisnikId(
    ["korisnik-id", korisnikId],
    {
      onSuccess: () => {
        console.log("data", data);
      },
    }
  );
  const { data: ulogaKorisnika } = useFetchUloga(
    [
      "uloga-id",
      loggedKorisnik && loggedKorisnik[0] && loggedKorisnik[0].uloga_id
        ? loggedKorisnik[0].uloga_id
        : "1",
    ],
    {
      onSuccess: () => {
        console.log("uloga", uloga);
      },
      enabled: isSuccess,
    }
  );
  const { data: dataZaIzvrsioca } = useFetchZadaciZaIzvrsioca([
    "dohvati_zadatke_za_izvrsioca",
    korisnikId,
  ]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={
          ulogaKorisnika.naziv === "izvrsilac" ? dataZaIzvrsioca : data
        }
        pagination={false}
        rowKey="id"
      />
      <Modal
        title="Izvrsioci"
        width={800}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
      >
        <Table
          columns={columnsIzvrsioci}
          dataSource={izvrsiociZaZadatak}
          pagination={false}
          rowKey="id"
        />
      </Modal>
      <Modal
        title={"Ostavi komentar"}
        width={500}
        visible={isKomentarModalVisible}
        onCancel={() => {
          setIsKomentarModalVisible(false);
        }}
        footer={null}
      >
        <Form name="dodajKomentar" onFinish={dodajKomentarFinish}>
          <Checkbox
            onChange={() => {
              setKomentarAvailable((prev) => !prev);
            }}
            style={{ marginBottom: "10px" }}
          >
            Zavrsio sam svoj deo posla
          </Checkbox>
          <Form.Item label="Komentar" name="komentar">
            <TextArea rows={4} disabled={!komentarAvailable} />
            {/* DOHVATI JEDAN KOMENTAR */}
          </Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Sacuvaj
            </Button>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Izmeni zadatak"
        destroyOnClose={true}
        width={500}
        visible={isEditTask}
        onCancel={() => {
          setIsEditTask(false);
        }}
        footer={null}
      >
        <Form
          name="basicTask"
          onFinish={onFinishTaskEdit}
          initialValues={zadatak}
        >
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
        title="Dodaj izvrsioca"
        width={500}
        visible={isDodajIzvrsioca}
        onCancel={() => {
          setIsDodajIzvrsioca(false);
        }}
        footer={null}
      >
        <Select
          style={{ width: "100%" }}
          onChange={(value) => {
            setKorisnikId(value);
          }}
        >
          {dataIzvrsioci ? (
            dataIzvrsioci.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.username}
              </Option>
            ))
          ) : (
            <>
              <Option value={null}>NULL</Option>
            </>
          )}
        </Select>
        <Row justify="end" style={{ marginTop: "1rem" }}>
          <Button
            type="primary"
            onClick={() => {
              const obj = {
                zadatak_id: zadatak_id,
                korisnik_id: korisnik_id,
              };
              var form_data = new FormData();
              for (var key in obj) {
                form_data.append(key, obj[key]);
              }
              dodajVezuZadatakIzvrsiocMutation.mutate(form_data, {
                onSuccess: () => {
                  setIsDodajIzvrsioca(false);
                  //INVALIDATE IZVRSIOCE ZA ZADATAK
                },
              });
            }}
          >
            Dodaj
          </Button>
        </Row>
      </Modal>
      <Modal
        title="Komentari"
        width={800}
        visible={isKomentarVisible}
        onCancel={() => {
          setIsKOmentarVisible(false);
        }}
        footer={null}
      >
        <Table
          columns={columnsKomentari}
          dataSource={komentariZadatak}
          pagination={false}
          rowKey="id"
        />
      </Modal>
      <Modal
        title={"Ostavi komentar"}
        width={500}
        visible={izmeniKomentarVisible}
        onCancel={() => {
          setIzmeniKomentarVisible(false);
        }}
        footer={null}
      >
        <Form name="izmeniKomentar" onFinish={izmeniKomentarFinish}>
          <Form.Item label="Komentar" name="komentar">
            <TextArea rows={4} />
          </Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Izmeni
            </Button>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export { ZadatakTable };
