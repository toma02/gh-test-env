const GreskaPolja = ({ id, poruka }) => {
  if (!poruka) return null;

  return (
    <p id={id} className="greska" role="alert">
      {poruka}
    </p>
  );
};

export default GreskaPolja;
