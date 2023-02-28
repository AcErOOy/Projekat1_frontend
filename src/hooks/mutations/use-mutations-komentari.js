import { useMutation } from "react-query";
import { KomentarService } from "../../modules/komentari/komentari.service";

const useKomentariMutations = () => {
  const dodajKomentarMutation = useMutation((variables) => {
    return KomentarService.dodajKomentar(variables);
  });
  const obrisiKomentarMutation = useMutation((variable) => {
    return KomentarService.obrisiKomentar(variable);
  });
  const obrisiJedanKomentarMutation = useMutation((id) => {
    return KomentarService.obrisiJedanKomentar(id);
  });
  const izmeniKomentarMutation = useMutation((variables) => {
    return KomentarService.izmeniKomentar(variables);
  });

  return {
    dodajKomentarMutation,
    obrisiKomentarMutation,
    obrisiJedanKomentarMutation,
    izmeniKomentarMutation,
  };
};

export { useKomentariMutations };
