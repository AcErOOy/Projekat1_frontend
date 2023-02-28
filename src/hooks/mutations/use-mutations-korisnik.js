import { KorisnikService } from "../../modules";
import { useMutation } from "react-query";

const useKorisnikMutations = () => {
  const dodajKorisnikaMutation = useMutation((variables) => {
    console.log("dodajKorisnika", variables);
    return KorisnikService.dodajKorisnik(variables);
  });
  const izmeniKorisnikaMutations = useMutation(({ id, variables }) => {
    console.log("izmeniKorisnika", variables);
    return KorisnikService.izmeniKorisnika(id, variables);
  });
  const izmeniLozinkuMutations = useMutation(({ id, variables }) => {
    console.log("izmeniLozinku", variables);
    return KorisnikService.izmeniLozinku(id, variables);
  });
  const obrisiKorisnikaMutations = useMutation((id) => {
    return KorisnikService.obrisiKorisnika(id);
  });
  const registrujSeMutations = useMutation((variables) => {
    console.log("registrujSe", variables);
    return KorisnikService.registrujSe(variables);
  });
  const prijaviSeMutations = useMutation((variables) => {
    console.log("prijaviSe", variables);
    return KorisnikService.prijaviSe(variables);
  });
  const dodajVezuZadatakIzvrsiocMutation = useMutation((variables) => {
    return KorisnikService.dodajVezuZadatakIzvrsioc(variables);
  });
  const potvrdiEmailMutation = useMutation((variables) => {
    return KorisnikService.potvrdiEmail(variables);
  });
  const aktivirajNalogMutation = useMutation((variables) => {
    return KorisnikService.aktivirajNalog(variables);
  });
  const aktivirajMutation = useMutation((variables) => {
    return KorisnikService.aktiviraj(variables);
  });

  return {
    dodajKorisnikaMutation,
    izmeniKorisnikaMutations,
    izmeniLozinkuMutations,
    obrisiKorisnikaMutations,
    registrujSeMutations,
    prijaviSeMutations,
    dodajVezuZadatakIzvrsiocMutation,
    potvrdiEmailMutation,
    aktivirajNalogMutation,
    aktivirajMutation,
  };
};
export { useKorisnikMutations };
