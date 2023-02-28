import { useMutation } from "react-query";
import { GrupaZadatakaService } from "../../modules";

const useGrupeMutations = () => {
  const dodajGrupuMutation = useMutation((variables) => {
    console.log("dodajGrupu", variables);
    return GrupaZadatakaService.dodajGrupu(variables);
  });
  const obrisiGrupuMutation = useMutation((id) => {
    console.log("obrisiGrupuSUCESSFULL");
    return GrupaZadatakaService.obrisiGrupu(id);
  });
  const izmeniGrupuMutation = useMutation((variables) => {
    return GrupaZadatakaService.izmeniGrupu(variables);
  });

  return {
    dodajGrupuMutation,
    obrisiGrupuMutation,
    izmeniGrupuMutation,
  };
};

export { useGrupeMutations };
