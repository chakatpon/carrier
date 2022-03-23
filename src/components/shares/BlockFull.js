import React from "react";

class BlockFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ComponentDidMount() {
    console.log("full-block has mount");
  }

  render() {
    return <div className="full-block">{this.props.children}</div>;
  }
}

export default BlockFull;
