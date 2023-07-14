import { useState, useContext } from 'react';

import ImageUploading from 'react-images-uploading';
import userContext from '../../store/user-context';
import { imageUpload } from '../../utils/user';
import { getUserFromLocalStorage } from '../../utils/auth';

function ImageUploadForm({ user, setRenderedForm }) {
  const [image, setImage] = useState([]);
  const { updateUserInfo } = useContext(userContext);

  const onChange = image => {
    // data for submit
    setImage(image);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append('image', image[0].file);
    const dateString = Date.now();
    formData.append('dateString', dateString); // For random String in image name
    const user = getUserFromLocalStorage();
    formData.append('oldImage', user.profileImage);
    const data = await imageUpload(formData);
    updateUserInfo(data.result.user);
    // changeImage();
    // const baseURL = 'http://localhost:3000/api/v1';
    // const token = getToken();
    // const user = getUserFromLocalStorage();

    // const response = await fetch(`${baseURL}/user/imageUpload/${user._id}`, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //   },
    // });

    // if (!response.ok) {
    //   const error = await response.json();
    //   return {
    //     status: 'error',
    //     error: error.message,
    //   };
    // }
  };

  return (
    <div className="mx-auto">
      <ImageUploading
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          onImageUpload,
          // onImageUpdate,
          // onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <>
            <div {...dragProps} onClick={onImageUpload} className="relative">
              <div className="a w-80 h-80 border-4 border-dashed border-gray-400 bg-slate-300 flex items-center justify-center overflow-hidden">
                {image.length === 0 && (
                  <h4 className="text-center text-lg text-gray-500 px-4">
                    Drag and Drop your image here or click here to import image{' '}
                  </h4>
                )}
                {image.length !== 0 && (
                  <img
                    className="m-auto"
                    src={
                      image.length !== 0
                        ? image[0]['data_url']
                        : // : `images/avatar/${user.profileImage}`
                          ''
                    }
                    width={300}
                  />
                )}
              </div>
            </div>
            {/* <div className="flex p-8 justify-around">
              <button
                className="w-20 bg-slate-500 p-2 text-white rounded-md"
                onClick={onImageUpdate}
              >
                Change
              </button>
              <button
                className="w-20 bg-slate-500 p-2 text-white rounded-md"
                onClick={onImageRemove}
              >
                Remove
              </button>
            </div> */}
          </>
        )}
      </ImageUploading>
      <div className="mt-4">
        <button
          onClick={submitHandler}
          className="block m-auto bg-yellow-500 px-4 py-2 rounded-md text-white
           hover:scale-105 active:translate-y-1 transition
          "
        >
          Set as Profile Image
        </button>
      </div>
      <div className="mt-4 flex">
        <button
          onClick={() => setRenderedForm('userProfile')}
          className="block m-auto bg-slate-500 px-4 py-2 rounded-md text-white
           hover:scale-105 active:translate-y-1 transition
          "
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default ImageUploadForm;
