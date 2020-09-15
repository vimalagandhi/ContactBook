import React, { Component } from "react";

import PropTypes from "prop-types";

export class AppTopbar extends Component {
 
  static defaultProps = {
    onToggleMenu: null
  };

  static propTypes = {
    onToggleMenu: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="layout-topbar clearfix">
        <button
          className="p-link layout-menu-button"
          onClick={this.props.onToggleMenu}
        >
          <span className="pi pi-bars" />
          <span className="layout-topbar-item-text">{this.props.title}</span>
        </button>
        <div className="layout-topbar-icons">
         
        </div>
      </div>
    );
  }
}
