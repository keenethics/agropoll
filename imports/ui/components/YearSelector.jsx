import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '/imports/ui/actions/allActions.js';

class YearSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectYear = this.selectYear.bind(this);
  }

  selectYear(e) {
    if (e.target.tagName === 'LI') {
      const year = e.target.value.toString();
      // localStorage.setItem('marketingYear', year);
      this.props.actions.selectYear(year);
    }
  }

  render() {
    return (
      <div className="years-container">
        <ul className="years" onClick={this.selectYear}>
          <li className={this.props.marketingYear === '2016' ? 'li-class selected' : 'li-class'} value="2016">2016</li>
          <li className={this.props.marketingYear === '2017' ? 'li-class selected' : 'li-class'} value="2017">2017</li>
          <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018">2018</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ all }) => ({ ...all });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);
