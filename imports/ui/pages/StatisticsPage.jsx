import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Crops, Groups } from '/imports/api/crops/crops.js';
import { Records } from '/imports/api/records/records.js';
import SearchBar from '/imports/ui/components/SearchBar.jsx';

class StatisticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  sumOfSquares(cropId) {
    return this.props.records.
      filter((item) => item.cropId === cropId).
      reduce((sum, item) => sum + +item.square, 0)
  }

  avgCropCapacity(cropId) {

    return this.props.records.
      filter((item) => item.cropId === cropId).
      reduce((sum, item) => sum + item.square * item.cropCapacity, 0) / this.sumOfSquares(cropId);

  }

  render() {
    console.log('-->',this.props);

    return (
      <div>
        <h3>Statistics Page</h3>

        <SearchBar />

        <div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell">Культура</div>
            <div className="cell">Площа</div>
            <div className="cell">Урожайність</div>
            <div className="cell"></div>
          </div>
          {this.props.groups.map(group => (
            <div key={group.id}>

              <div className="row">
                <div className="head">{group.name}</div>
              </div>
              {this.props.crops.filter(crop => crop.groupId === group.id).map(crop => (
                <div className="row" key={crop.id}>
                  <div className="cell"></div>
                  <div className="cell">{crop.name}</div>
                  <div className="cell">
                    {this.sumOfSquares(crop.id)}
                  </div>
                  <div className="cell">
                    {this.avgCropCapacity(crop.id)}
                  </div>
                  <div className="cell"></div>
                </div>
              ))}

            </div>
          ))}

        </div>


      </div>
    )
  }
}

export default createContainer (({ params }) => {
  const user = Meteor.user();
  const cropsHandler = Meteor.subscribe('crops.all');
  const groupsHandler = Meteor.subscribe('groups.all');
  const recordsHandler = Meteor.subscribe('records.all');

  return {
    user,
    crops: Crops.find({}).fetch(),
    groups: Groups.find({}).fetch(),
    records: Records.find({}).fetch()
  }
}, StatisticsPage);
