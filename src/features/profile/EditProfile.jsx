import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineGlobeAlt,
  HiOutlineCamera,
  HiUserCircle,
} from "react-icons/hi";
import { UpdateProfile, UploadImages, getMe } from "../../api/userProfile";
import { Spinner } from "../../helpers/Loader";
import { useUser } from "../../store/userContext";
import { useToast } from "../../components/Toast.jsx";

const EditProfile = () => {
  const [isLoading, SetLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(true);
  const navigate = useNavigate();
  const { user, addUser } = useUser();
  const showToast = useToast();
  const userFiles = new FormData();

  const [userInputs, setuserInputs] = useState({
    username: "",
    bio: "",
    name: "",
    website: "",
    email: "",
    phone: "",
    gender: "",
    profession: "",
    country: "",
    state: "",
  });

  // Prefill form with existing user data
  useEffect(() => {
    const prefillData = async () => {
      try {
        const data = await getMe();
        const profile = data?.data || data;
        if (profile) {
          setuserInputs((prev) => ({
            ...prev,
            username: profile.username || "",
            bio: profile.bio || "",
            name: profile.name || "",
            website: profile.website || "",
            email: profile.email || "",
            phone: profile.phone || "",
            gender: profile.gender || "",
            profession: profile.profession || "",
            country: profile.country || "",
            state: profile.state || "",
          }));
        }
      } catch (err) {
        // Prefill failed silently — user can still fill manually
      } finally {
        setPrefilling(false);
      }
    };
    prefillData();
  }, []);

  const HandleOnChange = async function (inpt) {
    const { name, value, files } = inpt;

    if (!files) {
      return setuserInputs((prevItems) => ({
        ...prevItems,
        [name]: value,
      }));
    } else {
      userFiles.append("images", files[0]);
    }
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true);

    try {
      if (!!!userFiles.entries().next().done) {
        await UploadImages(userFiles);
      }
      const updatedProfile = await UpdateProfile(userInputs);

      if (updatedProfile.code === 200) {
        const curUpdatedUser = await getMe();
        addUser(curUpdatedUser);
        showToast("Profile updated successfully!");
        navigate(-1);
      } else {
        showToast("Failed to update profile.", "error");
      }
    } catch (err) {
      showToast("Something went wrong.", "error");
    }
    SetLoading(false);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => HandleOnSubmit(e)}
      className="px-5 pb-4"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    upshare.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="janesmith"
                    value={userInputs.username}
                    onChange={(e) => HandleOnChange(e.target)}
                    className="block flex-1 border-0 bg-transparent py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  maxLength={"150"}
                  value={userInputs.bio}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block h-28 w-full px-4 rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Write a few sentences that describes you the best.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="profilephoto"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <HiUserCircle
                  className="h-12 w-12 text-gray-300 "
                  aria-hidden="true"
                />
                <input
                  type="file"
                  id="profilephoto"
                  name="profilephoto"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => HandleOnChange(e.target)}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 active:ring-2 active:ring-blue-400  ring-gray-300 hover:bg-gray-50"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="coverphoto"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <label
                htmlFor="coverphoto"
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
              >
                <div className="text-center">
                  <HiOutlineCamera
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="coverphoto"
                      className="relative cursor-pointer rounded-lg font-semibold text-blue-600      hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        id="coverphoto"
                        name="coverphoto"
                        className="sr-only"
                        accept=".jpg,.png,.jpeg"
                        onChange={(e) => HandleOnChange(e.target)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userInputs.name}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website (Optional)
              </label>
              <div className="mt-2 py-0.5 pr-0.5 flex rounded-lg bg-white ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                <span className="flex text-center  select-none items-center pl-3 text-gray-500 sm:text-sm">
                  <HiOutlineGlobeAlt className="w-5 h-5 mr-0.5" /> /
                </span>
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={userInputs.website}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block flex-1 border-0 bg-transparent py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userInputs.email}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  minLength="10"
                  maxLength="10"
                  value={userInputs.phone}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={userInputs.gender ? userInputs.gender : "select"}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="select" disabled hidden>
                    Select
                  </option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="profession"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profession
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={userInputs.profession}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  value={userInputs.country ? userInputs.country : "select"}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option>Mexico</option>
                  <option value="select" disabled hidden>
                    Select
                  </option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={userInputs.state}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block w-full rounded-lg border-0 px-2 py-2 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-4 py-2 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          {isLoading ? <Spinner /> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
