import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg shadow-sm p-3 rounded">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Ebook Library
            </a>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Beranda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#katalog">
                    Buku Kami
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#tentang">
                    Tentang Kami
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Kontak Kami
                  </a>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/upload">Upload</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
