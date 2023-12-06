import React from 'react';

const Footer = () => {
  return (
    <footer className="">
      <div className="container mx-auto">
        <div className="mt-4 mb-6 text-center ">
          <p>&copy; {new Date().getFullYear()} Fstg-Irisi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
