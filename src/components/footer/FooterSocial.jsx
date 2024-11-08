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
    <div className="flex items-center justify-between gap-2 lg:gap-5">
      <div className="hidden lg:block">Follow Us</div>
      <FaFacebook color="white" size={20} />
      <FaYoutube color="white" size={20} />
      <FaInstagram color="white" size={20} />
      <FaTwitter color="white" size={20} />
      <FaLinkedin color="white" size={20} />
      <FaTelegram color="white" size={20} />
      <FaTiktok color="white" size={20} />
    </div>
  );
};

export default FooterSocial;
