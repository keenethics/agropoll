import React from 'react'
import { Meteor } from 'meteor/meteor';

export default class TableHeader extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <thead>
        <tr>
          <th>_</th>
          <th>Культура</th>
          <th>Площа</th>
          <th>Урожай</th>
          <th>Стан</th>
        </tr>
      </thead>
    )
  }
}
