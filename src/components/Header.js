import logo from '../img/mo_logo.png';

const Header = ({ title }) => {
  return (
    <header>
      <div className="d-flex align-items-center py-3">
        <a href="/">
          <img className="img-fluid w-75" src={logo} alt="Moc Oddechu" />
        </a>
        <h1 className="align-middle text-secondary fw-light">{title}</h1>
      </div>
    </header>
  );
};
export default Header;
