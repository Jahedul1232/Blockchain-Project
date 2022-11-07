const Doctor = () => {
  return (
    <div className="app">
      <h3>Welcome to the doctors page</h3>
      <button
        onClick={(event) => {
          window.location.href = "/";
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Doctor;
