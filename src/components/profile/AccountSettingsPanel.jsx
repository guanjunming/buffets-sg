import PasswordForm from "./PasswordForm";
import ProfileForm from "./ProfileForm";

const AccountSettingsPanel = ({ user }) => {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 p-4">
        <ProfileForm name={user.name} />
      </div>
      <div className="mt-5 p-4">
        <PasswordForm />
      </div>
    </div>
  );
};

export default AccountSettingsPanel;
