import { AccountCard } from "./AccountCard";
import { AccountTable } from "./AccountTable";
import { useFetchKorisnikId } from "../../hooks/fetch/use-fetch-korisnik-id";
import { useFetchUloga } from "../../hooks/fetch/use-fetch-uloga";
import styles from "./AccountWrapper.module.css";
import { useFetchSveKorisnike } from "../../hooks/fetch/use-fetch-svi-korisnici";

const AccountWrapper = () => {
  const korisnik_id_string = localStorage.getItem("korisnik_id");
  const { data } = useFetchKorisnikId(["korisnik-id", korisnik_id_string], {
    onSuccess: () => {
      console.log("data", data);
    },
  });
  const { data: uloga } = useFetchUloga(
    ["uloga-id", data && data[0].uloga_id ? data[0].uloga_id : "1"],
    {
      onSuccess: () => {
        console.log("uloga", uloga);
      },
    }
  );
  const { data: korisnici } = useFetchSveKorisnike("svi-korisnici");

  return (
    <>
      <div className={styles.accountWrapper}>
        <AccountCard klijent={data} uloga={uloga} />
        {uloga.naziv === "administrator" && (
          <AccountTable korisnici={korisnici} />
        )}
      </div>
    </>
  );
};

export { AccountWrapper };
