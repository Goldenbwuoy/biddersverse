import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";
import {
	Facebook,
	Instagram,
	YouTube,
	Twitter,
	LinkedIn,
} from "@material-ui/icons";

function Footer() {
	return (
		<div className="footer-container">
			<section className="footer-subscription">
				<p className="footer-subscription-heading">
					Biddersverse is a leader in Online Auctions for Consumer
					Electronic Products
				</p>
			</section>
			<div className="footer-links">
				<div className="footer-link-wrapper">
					<div className="footer-link-items">
						<h2>About Us</h2>
						<Link to="/sign-up">How it works</Link>
						<Link to="/">Testimonials</Link>
						<Link to="/">Careers</Link>
						<Link to="/">Investors</Link>
						<Link to="/">Terms of Service</Link>
					</div>
					<div className="footer-link-items">
						<h2>Contact Us</h2>
						<Link to="/">Contact</Link>
						<Link to="/">Support</Link>
						<Link to="/">Destinations</Link>
						<Link to="/">Sponsorships</Link>
					</div>
				</div>
				<div className="footer-link-wrapper">
					<div className="footer-link-items">
						<h2>Videos</h2>
						<Link to="/">Submit Video</Link>
						<Link to="/">Ambassadors</Link>
						<Link to="/">Agency</Link>
						<Link to="/">Influencer</Link>
					</div>
					<div className="footer-link-items">
						<h2>Quick Links</h2>
						<Link to="/">My Products</Link>
						<Link to="/">My Bids</Link>
						<Link to="/">Sold Auctions</Link>
						<Link to="/">Won Auctions</Link>
						<Link to="/">Live Auctions</Link>
					</div>
				</div>
			</div>
			<section className="social-media">
				<div className="social-media-wrap">
					<div className="footer-logo">
						<Link to="/" className="social-logo">
							Biddersverse
							{/* <i class='fab fa-typo3' /> */}
						</Link>
					</div>
					<small className="website-rights">
						Biddersverse © 2021
					</small>
					<div className="social-icons">
						<Link
							className="social-icon-link facebook"
							to="/"
							target="_blank"
							aria-label="Facebook"
						>
							<Facebook />
						</Link>
						<Link
							className="social-icon-link instagram"
							to="/"
							target="_blank"
							aria-label="Instagram"
						>
							<Instagram />
						</Link>
						<Link
							className="social-icon-link youtube"
							to="/"
							target="_blank"
							aria-label="Youtube"
						>
							<YouTube />
						</Link>
						<Link
							className="social-icon-link twitter"
							to="/"
							target="_blank"
							aria-label="Twitter"
						>
							<Twitter />
						</Link>
						<Link
							className="social-icon-link twitter"
							to="/"
							target="_blank"
							aria-label="LinkedIn"
						>
							<LinkedIn />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Footer;
