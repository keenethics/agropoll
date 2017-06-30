import React from 'react';


export default class Footer extends React.Component {

  changeLanguage(language) {
    localStorage.setItem('language', language);
    location.reload();
  }


  render() {
    return (
      <div className="footer">
        <div className="footer-item">
          <button
            onClick={() => this.changeLanguage('ua')}
          >
            Українська
          </button>
          &nbsp;
          <button
            onClick={() => this.changeLanguage('en')}
          >
            English
          </button>
        </div>

        <div className="footer-item">
          developed by&nbsp;
          <a
            href="https://keenethics.com"
            target="blank"
            className="footer-link"
          >
            keenethics
          </a>
        </div>
      </div>
    );
  }
}
