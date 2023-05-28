import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineGlobeAlt,
  HiOutlineCamera,
  HiUserCircle,
} from "react-icons/hi";
import { UpdateProfile } from "../../../api/userProfile";
import { Spinner } from "../../../helpers/Loader";

const EditProfile = () => {
  const [isLoading, SetLoading] = useState(false);
  const navigate = useNavigate();
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
    const updatedProfile = await UpdateProfile(userInputs, userFiles);
    if (updatedProfile.code === 200) {
      navigate(-1);
    } else {
      console.log(user);
    }
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
          <p className="mt-1 text-sm leading-6 text-gray-600">
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
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
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
                  className="block h-28 w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
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
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 active:ring-2 active:ring-indigo-600  ring-gray-300 hover:bg-gray-50"
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
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-600      hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        id="coverphoto"
                        name="coverphoto"
                        className="sr-only"
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
          <p className="mt-1 text-sm leading-6 text-gray-600">
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="mt-2 py-0.5 pr-0.5 flex rounded-md bg-white ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex text-center  select-none items-center pl-3 text-gray-500 sm:text-sm">
                  <HiOutlineGlobeAlt className="w-5 h-5 mr-0.5" /> /
                </span>
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={userInputs.website}
                  onChange={(e) => HandleOnChange(e.target)}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner /> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
