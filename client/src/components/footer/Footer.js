import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer'>
        <span>{currentYear} &copy; Prince Boye Ologbese</span>
    </footer>
  );
};

export default Footer;
