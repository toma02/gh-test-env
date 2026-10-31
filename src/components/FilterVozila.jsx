import { Button } from "./Button";

const FilterVozila = ({ filteri, marke, onPromijeni, onPonisti }) => {
  return (
    <div className="forma filteri">
      <div className="filteri-polja">
        <div className="filter-polje">
          <label htmlFor="pretraga-vozila">Pretražite aute</label>
          <input
            id="pretraga-vozila"
            name="pojam"
            type="search"
            value={filteri.pojam}
            onChange={onPromijeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="cijena-od">Cijena od (€)</label>
          <input
            id="cijena-od"
            name="cijenaOd"
            type="number"
            min="0"
            value={filteri.cijenaOd}
            onChange={onPromijeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="cijena-do">Cijena do (€)</label>
          <input
            id="cijena-do"
            name="cijenaDo"
            type="number"
            min="0"
            value={filteri.cijenaDo}
            onChange={onPromijeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="ocjena-vozila">Najmanja ocjena</label>
          <select
            id="ocjena-vozila"
            name="ocjena"
            value={filteri.ocjena}
            onChange={onPromijeni}
          >
            <option value="0">Sve ocjene</option>
            <option value="3">Barem 3</option>
            <option value="4">Barem 4</option>
          </select>
        </div>
        <div className="filter-polje">
          <label htmlFor="popust-vozila">Najmanji popust</label>
          <select
            id="popust-vozila"
            name="popust"
            value={filteri.popust}
            onChange={onPromijeni}
          >
            <option value="0">Svi auti</option>
            <option value="5">Barem 5 %</option>
            <option value="10">Barem 10 %</option>
          </select>
        </div>
        <div className="filter-polje">
          <label htmlFor="redoslijed-vozila">Redoslijed</label>
          <select
            id="redoslijed-vozila"
            name="redoslijed"
            value={filteri.redoslijed}
            onChange={onPromijeni}
          >
            <option value="zadano">Zadani redoslijed</option>
            <option value="najjeftiniji">Od najjeftinijeg</option>
            <option value="najskuplji">Od najskupljeg</option>
            <option value="najboljaOcjena">Od najbolje ocjene</option>
          </select>
        </div>
      </div>
      <div className="filteri-radnje">
        <div className="actions">
          {marke.map((marka) => (
            <Button
              key={marka}
              name="marka"
              value={marka}
              className={
                filteri.marka === marka ? "gumb" : "gumb gumb-povratak"
              }
              aria-pressed={filteri.marka === marka}
              onClick={onPromijeni}
            >
              {marka}
            </Button>
          ))}
        </div>
        <Button className="gumb gumb-povratak" onClick={onPonisti}>
          Poništite filtre
        </Button>
      </div>
    </div>
  );
};

export default FilterVozila;
