const API_URL = "https://dummyjson.com";

// DummyJSON samo simulira POST, PATCH i DELETE, pa se promjene vide samo u stanju.
export async function apiRequest(putanja, opcije) {
  const odgovor = await fetch(`${API_URL}/${putanja}`, opcije);
  if (!odgovor.ok) throw new Error();
  return odgovor.json();
}
