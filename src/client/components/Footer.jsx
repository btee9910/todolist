const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__content">
        Copyright © {currentYear}. Proudly made by{" "}
        <a
          href="https://www.linkedin.com/in/btee/"
          target="_blank"
          rel="noreferrer"
        >
          Brandon Tee
        </a>
      </span>
    </footer>
  );
};

export default Footer;
