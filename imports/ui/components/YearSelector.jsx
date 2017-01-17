import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '/imports/ui/actions/allActions.js';

class YearSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectYear = this.selectYear.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.down = false;
    this.XCoordinate = 0;
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      this.down = false;
    });

    const yearPins = document.getElementsByClassName('li-class');
    const yearPinWidth = parseInt(yearPins[0].offsetWidth, 10) + 5;
    const yearCount = document.getElementsByClassName('li-class').length;
    document.getElementsByClassName('years')[0].style.width = `${yearCount * yearPinWidth}px`;
  }

  selectYear(e) {
    this.down = false;
    const year = e.target.value ? e.target.value.toString() : e.target.innerText;
    // localStorage.setItem('marketingYear', year);
    this.props.actions.selectYear(year);
  }

  mouseDown(e) {
    this.down = true;
    this.XCoordinate = e.clientX || e.nativeEvent.pageX;
  }

  mouseMove(e) {
    const yearWidth = parseInt(document.getElementsByClassName('years')[0].offsetWidth, 10);
    const yearWrapper = document.getElementsByClassName('statistic-one')[0] || document.getElementsByClassName('insert-one')[0];
    if (yearWrapper.offsetWidth && yearWidth && this.down && yearWidth > yearWrapper.offsetWidth) {
      const XCoord = e.clientX || e.nativeEvent.pageX;
      const difference = XCoord - this.XCoordinate;
      e.currentTarget.style.left = `${parseInt(e.currentTarget.style.left || 0, 10) + difference}px`;
      this.XCoordinate = XCoord;
    }
  }
  render() {
    return (
      <ul
        className="years noselect"
        onMouseUp={this.selectYear}
        onMouseDown={this.mouseDown}
        onMouseMove={this.mouseMove}
        onTouchStart={this.mouseDown}
        onTouchEnd={this.selectYear}
        onTouchMove={this.mouseMove}
      >
        <li className={this.props.marketingYear === '2016' ? 'li-class selected' : 'li-class'} value="2016"><div>2016</div></li>
        <li className={this.props.marketingYear === '2017' ? 'li-class selected' : 'li-class'} value="2017"><div>2017</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
      </ul>
    );
  }
}

const mapStateToProps = ({ all }) => ({ ...all });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);
