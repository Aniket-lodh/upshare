import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import { createPost } from "../../api/post.js";
import { Spinner } from "../../helpers/Loader.jsx";
import { useToast } from "../../components/Toast.jsx";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const showToast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Client-side validation — surface messages, don't silently block
    if (!image) {
      setError("An image is required.");
      showToast("An image is required.", "error");
      return;
    }
    if (!caption.trim()) {
      setError("Caption is required.");
      showToast("Caption is required.", "error");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption.trim());
      if (tags.trim()) {
        const tagsArray = tags.split(",").map((t) => t.trim());
        formData.append("tags", JSON.stringify(tagsArray));
      }
      const result = await createPost(formData);
      showToast("Post created successfully!");
      const newPost = result?.data || result;
      navigate("/", { replace: true, state: { newPost } });
    } catch (err) {
      const msg = err?.message || "Failed to create post. Please try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-20 lg:pb-6">
      <Helmet>
        <title>Create Post — UpShare</title>
      </Helmet>

      <h1 className="text-xl font-bold text-color-font-primary mb-6">
        Create Post
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Image upload */}
        <div>
          {!preview ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full h-52 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-color-primary-blue hover:text-color-primary-blue transition-colors cursor-pointer"
            >
              <HiOutlinePhotograph fontSize={40} />
              <span className="text-sm font-medium">Click to upload image</span>
            </button>
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-72 object-contain rounded-lg bg-gray-50"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <RiCloseLine fontSize={20} />
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Caption */}
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-color-font-secondary mb-1"
          >
            Caption <span className="text-red-500">*</span>
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition resize-none text-color-font-primary"
          />
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-color-font-secondary mb-1"
          >
            Tags <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. travel, photography, food"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition text-color-font-primary"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium text-white transition-all duration-150 ${
            !loading
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? <Spinner /> : "Share Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
