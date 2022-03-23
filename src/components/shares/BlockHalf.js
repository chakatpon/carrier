import React from "react";

class BlockHalf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="half-block">{this.props.children}</div>;
  }
}

export default BlockHalf;
