import { FaGithub } from "react-icons/fa";

const FooterSocial = () => {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">
      <div>Follow Us</div>
      <a href="https://github.com/guanjunming/buffets-sg" target="_blank">
        <FaGithub size={20} />
      </a>
    </div>
  );
};

export default FooterSocial;
