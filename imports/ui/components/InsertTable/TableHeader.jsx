import React from 'react';

export default class TableHeader extends React.Component {
  render() {
    return (
      <div className="trow table-header">
        <div className="tcoll1 tcell">
          {{ ua: 'Культура', en: 'Crops' }[localStorage.getItem('language') || 'ua']}
        </div>
        <div className="tcoll2 tcell">
          {{ ua: 'Площа, га', en: 'Square, hectare' }[localStorage.getItem('language') || 'ua']}
        </div>
        <div className="tcoll3 tcell">
          {{ ua: 'Урожайність, ц/га', en: 'Crops yield, quintals/hectare' }[localStorage.getItem('language') || 'ua']}
        </div>
        <div className="tcoll4 tcell">
          {{ ua: 'Стан', en: 'Status' }[localStorage.getItem('language') || 'ua']}
        </div>
      </div>
    );
  }
}
