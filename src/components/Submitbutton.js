import React from 'react';

const Submit = ({ clickSubmit }) => {
  return (
    <input
      type="button"
      className="btn btn-primary"
      value="Send us a message"
      onClick={clickSubmit}
    ></input>
  );
};

export { Submit };
