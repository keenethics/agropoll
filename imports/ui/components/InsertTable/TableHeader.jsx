import React from 'react';

export default class TableHeader extends React.Component {
  render() {
    return (
      <div className="trow table-header">
        <div className="tcoll1 tcell">Культура</div>
        <div className="tcoll2 tcell">Площа, <b>га</b></div>
        <div className="tcoll3 tcell">Урожайність, <b>ц/га</b></div>
        <div className="tcoll4 tcell">Стан</div>
      </div>
    );
  }
}
