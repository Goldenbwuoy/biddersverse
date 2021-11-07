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
import ContactUs from "./ContactUs";
import SupportUs from "./Support";
import auth from "../auth/auth-helper";

function Footer() {
	const isSeller = auth.isAuthenticated().user?.seller;
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
						<h2>Contact Us</h2>
						<SupportUs />
						<ContactUs />
					</div>
				</div>
				<div className="footer-link-wrapper">
					{isSeller && (
						<div className="footer-link-items">
							<h2>My Listings</h2>
							<Link to="/auctions/all/by-seller">
								All Listings
							</Link>
							<Link to="/auctions/live/by-seller">
								Live Listings
							</Link>
							<Link to="/auctions/sold/by-seller">
								Sold Listings
							</Link>
						</div>
					)}

					<div className="footer-link-items">
						<h2>My Bids</h2>
						<Link to="/auctions/all/bids">All Bids</Link>
						<Link to="/auctions/live/bids">Live Bids</Link>
						<Link to="/auctions/won/bids">Won Bids</Link>
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
						<a
							className="social-icon-link facebook"
							to="https://www.facebook.com/"
							target="_blank"
							aria-label="Facebook"
						>
							<Facebook />
						</a>
						<a
							className="social-icon-link instagram"
							href="https://www.instagram.com/Goldenbwuoy"
							target="_blank"
							aria-label="Instagram"
						>
							<Instagram />
						</a>
						<a
							className="social-icon-link youtube"
							href="https://www.youtube.com/channel/UCtnDkTW0WBe9l4vjzgsaApw"
							target="_blank"
							aria-label="Youtube"
						>
							<YouTube />
						</a>
						<a
							className="social-icon-link twitter"
							href="https://twitter.com/GMumanikidzwa5"
							target="_blank"
							aria-label="Twitter"
						>
							<Twitter />
						</a>
						<a
							className="social-icon-link twitter"
							href="https://www.linkedin.com/in/golden-mumanikidzwa-276587200/"
							target="_blank"
							aria-label="LinkedIn"
						>
							<LinkedIn />
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Footer;
