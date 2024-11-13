import FooterSocial from "../components/footer/FooterSocial";

const Footer = () => {
  return (
    <div className="mx-5 mt-5 flex flex-col-reverse items-center justify-between gap-5 border-t border-neutral-500 p-5 md:flex-row">
      <div>Copyright © {new Date().getFullYear()}</div>
      <FooterSocial />
    </div>
  );
};

export default Footer;
