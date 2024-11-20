import FooterSocial from "../components/footer/FooterSocial";

const Footer = () => {
  return (
    <div className="mx-5 mt-5 flex flex-row items-center justify-between gap-5 border-t border-neutral-500 p-5 text-center">
      <div>Copyright © {new Date().getFullYear()}</div>
      <FooterSocial />
    </div>
  );
};

export default Footer;
