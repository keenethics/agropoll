import React from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Localities } from '/imports/api/localities/localities.js';

class LocationFilter extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    console.log(this.props.localities);
    return (
      <div className="LocationFilter-wrapper">
        <h3>Select area:</h3>
        <select>
          <option>All Ukraine</option>
        </select>
      </div>
    )
  }
}

export default createContainer(({ params }) => {
  const localities = Meteor.subscribe('localities.all');

  return {
    localities: Localities.find().fetch(),
  }
}, LocationFilter);
