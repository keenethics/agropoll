import React from 'react';

export default class TableHeader extends React.Component{
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className="trow table-header">
        <div className="tcoll0"></div>
        <div className="tcoll1 tcell">Культура</div>
        <div className="tcoll2 tcell">Площа</div>
        <div className="tcoll3 tcell">Урожайність</div>
        <div className="tcoll4 tcell">Стан</div>
        <div className="tcoll5"></div>
      </div>
    );
  }
}
