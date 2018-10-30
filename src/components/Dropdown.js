import React, { Component } from 'react';

class Dropdown extends Component {

  render() {
        return (
      <div className="">
        <div className="form-group">
        <label className="font-weight-bold mt-2">{this.props.txt}: </label>
          <select className="form-control" onChange={this.props.handleChange}>
          {this.props.options}
          </select >
        </div>
      </div>
    )
  }
}

export default Dropdown;
