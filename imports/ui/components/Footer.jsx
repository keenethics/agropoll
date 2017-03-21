import React from 'react';


export default class Footer extends React.Component {

  changeLanguage(language) {
    localStorage.setItem('language', language);
    console.log('---->', localStorage.getItem('language'));
  }


  render() {
    return (
      <div className="footer">
        other languages:
        <button
          onClick={() => this.changeLanguage('ua')}
        >
          Українська
        </button>
        <button
          onClick={() => this.changeLanguage('en')}
        >
          English
        </button>

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
