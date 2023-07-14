import { useEffect, useState } from 'react';
import { redirect, json } from 'react-router-dom';
import { getOneUser, updateUser } from '../../../utils/user';
import { getUserFromLocalStorage } from '../../../utils/auth';
import UserProfileForm from '../../../components/form/UserProfileForm';
import PasswordChangeForm from '../../../components/form/PasswordChangeForm';
import ImageUploadForm from '../../../components/form/ImageUploadForm';
import PasswordForgotForm from '../../../components/form/PasswordForgotForm';

function Profile() {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [renderedForm, setRenderedForm] = useState('userProfile');

  useEffect(() => {
    const localUserData = getUserFromLocalStorage();

    async function getUser() {
      const user = await getOneUser(localUserData._id);
      console.log(user);
    }
    getUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-full p-8 flex flex-col ">
      {/* <div className="p-8 bg-lime-400"> */}
      {renderedForm === 'userProfile' && (
        <UserProfileForm
          user={user}
          renderPasswordForm={() => setRenderedForm('passwordForm')}
          renderImageChange={() => setRenderedForm('imageForm')}
        />
      )}
      {renderedForm === 'passwordForm' && (
        <PasswordChangeForm user={user} setRenderedForm={setRenderedForm} />
      )}
      {renderedForm === 'imageForm' && (
        <ImageUploadForm user={user} setRenderedForm={setRenderedForm} />
      )}
      {renderedForm === 'passwordForgot' && (
        <PasswordForgotForm user={user} setRenderedForm={setRenderedForm} />
      )}
      {/* </div> */}
    </div>
  );
}

export default Profile;

export async function action({ request }) {
  const formData = await request.formData();

  const userId = formData.get('userId');
  const username = formData.get('username');
  const displayName = formData.get('displayName');
  const email = formData.get('email');

  const updateField = {
    username,
    displayName,
    email,
  };

  const user = await updateUser(userId, updateField);
  if (!user) {
    json('Cannot edit user');
  }

  return redirect('/');
}
