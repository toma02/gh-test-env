const API_URL = "https://dummyjson.com";

// DummyJSON samo simulira POST, PATCH i DELETE, pa se promjene vide samo u stanju.
export async function zahtjev(putanja, opcije) {
  const odgovor = await fetch(`${API_URL}/${putanja}`, opcije);
  if (!odgovor.ok) throw new Error();
  return odgovor.json();
}

// Polje price je puna cijena, a popust se tek oduzima od nje.
export function cijenaSPopustom(vozilo) {
  return Math.round(vozilo.price * (1 - vozilo.discountPercentage / 100));
}
