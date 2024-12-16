import React from 'react';

const Footer = () => {
  const styles = {
    container: {
      backgroundColor: '#212121',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '16px',
      marginTop: '16px',
    },
    text: {
      fontSize: '12px',
    },
  };

  return (
    <footer style={styles.container}>
      <p style={styles.text}>© 2021 - 2024 Felicia Putri Tjiasaka. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
