import FooterSocial from "./FooterSocial";

const Footer = () => {
  return (
    <div className="mx-5 mt-5 flex flex-col-reverse items-center justify-between gap-5 border-t border-gray-400 p-5 lg:flex-row">
      <div>Copyright © {new Date().getFullYear()}</div>
      <FooterSocial />
    </div>
  );
};

export default Footer;
