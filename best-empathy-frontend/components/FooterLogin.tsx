import Link from "next/link";
import {
  faFacebookSquare,
  faInstagramSquare,
  faPinterest,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FooterLogin() {
  return (
    <div className="flex flex-col lg:flex-row justify-between px-[7%]">
      {/* Column 1 */}
      <div className="flex flex-col py-10 text-center items-center">
        {/* Social Media Icons */}
        <div className="flex flex-row ">
          <Link
            className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-pricing"
          >
            <FontAwesomeIcon className="" icon={faFacebookSquare} size="2x" />
          </Link>
          <Link
            className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-pricing"
          >
            <FontAwesomeIcon className="" icon={faTwitter} size="2x" />
          </Link>

          <Link
            className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-pricing"
          >
            <FontAwesomeIcon className="" icon={faInstagramSquare} size="2x" />
          </Link>

          <Link
            className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-pricing"
          >
            <FontAwesomeIcon className="" icon={faPinterest} size="2x" />
          </Link>
          <Link
            className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-pricing"
          >
            <FontAwesomeIcon className="" icon={faLinkedin} size="2x" />
          </Link>
        </div>
        <h1 className="text-xl uppercase font-bold mt-3">Cenify Therapy</h1>
        <p className="text-lg  font-bold  ">
          2578 Broadway #607 New York, NY 10025
        </p>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col py-5">
        <h1 className="capitalize text-lg font-semibold text-center">
          Our Terms and Policies
        </h1>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Terms of Use
        </Link>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Terms of Service
        </Link>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Privacy Policy
        </Link>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col py-5">
        <h1 className="capitalize text-lg font-semibold text-center">
          Join Our Therapist Network
        </h1>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/join-our-network"
        >
          Join Our Network
        </Link>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Therapist Pricing
        </Link>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Therapist Login
        </Link>
      </div>
      {/* Column 4 */}
      <div className="flex flex-col py-5">
        <h1 className="capitalize text-lg font-semibold text-center">
          Information
        </h1>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/join-our-network"
        >
          About Us
        </Link>
        <Link
          className="text-md text-slate-600 py-3 hover:text-slate-400 transition duration-500 text-center font-semibold"
          href="/therapist-pricing"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default FooterLogin;
