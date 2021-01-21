const required = (value) => {
  if (!value) {
    return (
      <>
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane!
        </div>
      </>
    );
  }
};

export default required;
