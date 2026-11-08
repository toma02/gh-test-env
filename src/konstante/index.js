import slikaServisa from "../assets/servis.jpg";
import slikaKocnica from "../assets/kocnice.jpg";
import slikaDijagnostike from "../assets/dijagnostika.jpg";

// Više od tri auta ne stane pregledno u tablicu usporedbe.
export const najviseUsporedbe = 3;

export const kategorije = [
  {
    naslov: "Održavanje bez odgađanja",
    opis: "Redovita briga o vozilu pomaže spriječiti veće kvarove i neplanirane troškove.",
  },
  {
    naslov: "Sigurnost na putu",
    opis: "Pripremite vozilo za svakodnevnu vožnju i dulja putovanja uz pravodobni pregled.",
  },
  {
    naslov: "Jasna preporuka",
    opis: "Saznajte što treba provjeriti odmah, a što možete planirati pri sljedećem posjetu.",
  },
];

export const usluge = [
  {
    id: 1,
    naslov: "Zamjena ulja i filtara",
    trajanje: "Oko 60 minuta",
    slika: slikaServisa,
    opisSlike: "Motor automobila za mali servis",
    cijena: 95,
    opis: "Zamjena motornog ulja i filtara te pregled osnovnih dijelova vozila.",
  },
  {
    id: 2,
    naslov: "Pregled i servis kočnica",
    trajanje: "Od 60 do 90 minuta",
    slika: slikaKocnica,
    opisSlike: "Kočioni disk i kočiona čeljust",
    cijena: 120,
    opis: "Pregled kočionog sustava te zamjena kočionih pločica i diskova prema potrebi.",
  },
  {
    id: 3,
    naslov: "Računalna dijagnostika",
    trajanje: "Oko 30 minuta",
    slika: slikaDijagnostike,
    opisSlike: "Kontrolne lampice na instrumentnoj ploči",
    cijena: 35,
    opis: "Očitavanje zabilježenih grešaka i provjera mogućeg uzroka problema na vozilu.",
  },
];

export const nacinRada = [
  {
    naslov: "Najprije razgovor",
    opis: "Slušamo što ste primijetili na vozilu i dogovaramo prvi pregled.",
  },
  {
    naslov: "Jasan dogovor",
    opis: "Objašnjavamo predložene radove i okvirnu cijenu prije početka servisa.",
  },
  {
    naslov: "Provjera nakon servisa",
    opis: "Prolazimo obavljene radove i preporuke za daljnje održavanje.",
  },
];
