import './Footer.css';
import './FooterResponsive.css';

function Footer() {
    return (
      <div className="wrapper-footer">
        <div className="footer">
          <div className="footer-list">
            <div className="footer-item">
              <h3 className="footer-title">STORE</h3>
              <a href="/" className="footer-link">
                Shipping & Returns{" "}
              </a>
              <a href="/" className="footer-link">
                Store Policy{" "}
              </a>
              <a href="/" className="footer-link">
                FAQ{" "}
              </a>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">ADDRESS</h3>
              <div className="footer-address">
                500 Terry Francois Street San Francisco, CA 94158
              </div>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">OPENING HOURS</h3>
              <span className="footer-time">Mon - Fri: 7am - 10pm</span>
              <span className="footer-time">Saturday: 8am - 10pm</span>
              <span className="footer-time">Sunday: 8am - 11pm</span>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">FOLLOW US</h3>
              <a href="/" className="footer-link">
                Facebook
              </a>
              <a href="/" className="footer-link">
                Instagram
              </a>
              <a href="/" className="footer-link">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Footer;