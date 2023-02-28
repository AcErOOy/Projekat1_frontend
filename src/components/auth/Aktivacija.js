import { Button } from "antd";
import { useHistory, useParams } from "react-router";
import { useKorisnikMutations } from "../../hooks";
import "./Aktivacija.css";

const Aktivacija = () => {
  const { email } = useParams();
  const history = useHistory();

  const { aktivirajMutation } = useKorisnikMutations();

  const aktiviraj = () => {
    const form_data = new FormData();
    form_data.append("email", email);
    aktivirajMutation.mutate(form_data, {
      onSuccess: () => {
        history.push("/login");
      },
    });
  };

  return (
    <div className="flex">
      <div className="center">
        <Button type="primary" onClick={aktiviraj}>Aktiviraj</Button>
      </div>
    </div>
  );
};

export { Aktivacija };
