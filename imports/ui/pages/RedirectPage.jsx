import React from 'react';

export default class LoginPage extends React.Component {

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>
          {{
            ua: 'Дані для входу надіслано на вказану пошту. Перевірте також папку «Спам»',
            en: 'Your link was sent to specified e-mail. Please, check also a "Junk" folder',
          }[localStorage.getItem('language') || 'ua']}
        </h2>
      </div>
    );
  }

}
