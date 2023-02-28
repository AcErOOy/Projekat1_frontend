import { useMutation } from "react-query";
import { ZadaciService } from "../../modules/zadaci/zadaci.service";

const useZadaciMutations = () => {
  const dodajZadatak = useMutation((variables) => {
    console.log("DOdajZadatak", variables);
    return ZadaciService.dodajZadatak(variables);
  });
  const obrisiZadatak = useMutation((id) => {
    return ZadaciService.obrisiZadatak(id);
  });
  const izmeniZadatak = useMutation((id) => {
    return ZadaciService.izmeniZadatak(id);
  });

  return {
    dodajZadatak,
    obrisiZadatak,
    izmeniZadatak,
  };
};

export { useZadaciMutations };
