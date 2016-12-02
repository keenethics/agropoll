import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import SearchBar from '/imports/ui/components/SearchBar.jsx';

export default class InsertPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Insert Page</h3>

        <SearchBar />
      </div>
    )
  }
}
