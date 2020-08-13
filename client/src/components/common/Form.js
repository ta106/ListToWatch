import React from "react";

export default function Form({ name, inputs, error, onsubmit }) {
  return (
    <div>
      <h1>{name} </h1>
      <form onSubmit={onsubmit}>
        {inputs.map((i) => {
          return (
            <div className="form-group" key={i.name}>
              <input
                className="form-control"
                type={i.type}
                name={i.name}
                placeholder={i.name}
              />
            </div>
          );
        })}

        {error ? <div className="alert alert-danger">{error}</div> : null}
        <button className="btn btn-primary" type="submit">
          {name.toLowerCase()}
        </button>
      </form>
    </div>
  );
}
