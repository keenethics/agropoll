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
    const year = e.target.value ? e.target.value.toString() : e.target.innerText;
    // localStorage.setItem('marketingYear', year);
    this.props.actions.selectYear(year);
  }

  render() {
    return (
      <ul className="years" onClick={this.selectYear}>
        <li className={this.props.marketingYear === '2016' ? 'li-class selected' : 'li-class'} value="2016"><div>2016</div></li>
        <li className={this.props.marketingYear === '2017' ? 'li-class selected' : 'li-class'} value="2017"><div>2017</div></li>
        <li className={this.props.marketingYear === '2018' ? 'li-class selected' : 'li-class'} value="2018"><div>2018</div></li>
      </ul>
    );
  }
}

const mapStateToProps = ({ all }) => ({ ...all });

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);
