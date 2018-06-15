import React from "react";

const Pictures = props => {
  return (
    <div>
      {<img alt="" src={props.pic} />}
      <div>
        <h1 style={{ color: "white" }}>This is where emotional score goes</h1>
      </div>
      <div>
        <h1 style={{ color: "white" }}>maybe other aspect??</h1>
      </div>
    </div>
  );
};

export default Pictures;
