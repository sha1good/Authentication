import ProfileForm from "./ProfileForm";

import classes from "./Userprofile.module.css";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
