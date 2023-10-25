import "./footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
        <span>{Date.now().getFullYear}</span>
        <span>By prince Boye Ologbese</span>
    </footer>
  );
};

export default Footer;
