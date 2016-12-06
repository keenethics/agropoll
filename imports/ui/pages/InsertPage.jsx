import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'

import SearchBar from '/imports/ui/components/SearchBar.jsx';
import TableInsert from '/imports/ui/components/TableInsert.jsx';

class InsertPage extends React.Component {
  constructor(props){
    super(props);
    this.applyInsert = this.applyInsert.bind(this);
  }

  applyInsert(){

  }

  render() {
    return (
      <div>
        <h2>Insert Page</h2>
        <SearchBar />
        <TableInsert insert={this.applyInsert}/>
      </div>
    )
  }
}

export default createContainer (( {params} ) => {
  const user = Meteor.user();
  const crops = Meteor.subscribe('crops.all');
  const groups = Meteor.subscribe('groups.all');

  return {
    user,
    crops,
    groups
  }
}, InsertPage)
