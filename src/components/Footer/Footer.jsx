import "./Footer.scss"
// @use "./Footer.scss"
const Footer = () => {
    return (
        <>
            <div className='footer-content'>
                <div className="footer-p1">
                    <h3>GROCSY</h3>
                    <p>Our mission is to provide fresh and organic products to our customers.</p>

                    <div className="social-links">
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div className="footer-p2">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i className="fas fa-map-marker-alt"></i> <span>123, ABC Road, XYZ City, India</span></li>
                        <li><i className="fas fa-phone-alt"></i><span> +91 1234567890</span></li>
                        <li><i className="fas fa-envelope"></i>
                            <a href="mailto:test@test.com"></a><span> Email Us</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-p3">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><i className="fas fa-arrow-right"></i> <a>Home</a></li>
                        <li><i className="fas fa-arrow-right"></i> <a>Features</a></li>
                        <li><i className="fas fa-arrow-right"></i> <a>Products</a></li>
                        <li><i className="fas fa-arrow-right"></i> <a>Categories</a></li>
                        <li><i className="fas fa-arrow-right"></i> <a>Cart</a></li>
                    </ul>
                </div>

                <div className="footer-p4">
                    <h3>Subscribe</h3>
                    <p>Subscribe to our newsletter to get updates on our latest offers!</p>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                <div className="footer-p5-cr">
                    <p className="footer-bottom">© 2023 Grocsy. All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;