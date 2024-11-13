import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaTiktok,
} from "react-icons/fa";

const FooterSocial = () => {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-5">
      <div className="hidden md:block">Follow Us</div>
      <FaFacebook size={20} />
      <FaYoutube size={20} />
      <FaInstagram size={20} />
      <FaTwitter size={20} />
      <FaLinkedin size={20} />
      <FaTelegram size={20} />
      <FaTiktok size={20} />
    </div>
  );
};

export default FooterSocial;
