import React from 'react';
import { browserHistory } from 'react-router';

import SearchBar from '/imports/ui/components/SearchBar.jsx';

export default class StatisticPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Statistic Page</h3>

        <SearchBar />
      </div>
    )
  }
}
