import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types/Profile";
import { API_BASE_URL, ENDPOINTS } from "../constants/Api";

function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [venueManager, setVenueManager] = useState(false);

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  const name = localStorage.getItem("name");

  useEffect(() => {
    async function fetchProfile() {
      if (!token || !name || !apiKey) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}${ENDPOINTS.PROFILES}/${name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.errors?.[0]?.message || "Error fetching profile");
          return;
        }

        const profileData = data.data;
        setProfile(profileData);
        setBio(profileData.bio || "");
        setAvatarUrl(profileData.avatar?.url || "");
        setAvatarAlt(profileData.avatar?.alt || "");
        setBannerUrl(profileData.banner?.url || "");
        setBannerAlt(profileData.banner?.alt || "");
        setVenueManager(profileData.venueManager || false);
      } catch (error) {
        alert("Failed to load profile");
        console.log(error);
      }
    }

    fetchProfile();
  }, [name, token, apiKey]);

  if (!profile) return <p>Loading profile...</p>;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!token || !name || !apiKey) return <p>Error</p>;

    try {
      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PROFILES}/${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          },
          body: JSON.stringify({
            bio,
            avatar: {
              url: avatarUrl,
              alt: avatarAlt
            },
            banner: {
              url: bannerUrl,
              alt: bannerAlt
            },
            venueManager
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.errors?.[0]?.message || "Error updating profile");
        return;
      }

      setProfile(data.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!isEditing ? (
        <section className="flex flex-col items-center justify-center gap-4">
          <img
            src={profile.banner?.url}
            alt={profile.banner?.alt || "Banner"}
            className="w-full lg:w-[1280px] max-h-[200px] object-cover"
          />
          <img
            src={profile.avatar?.url}
            alt={profile.avatar?.alt || "Avatar"}
            className="w-[120px] h-[120px] rounded-full object-cover"
          />

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl">Welcome, {profile.name}!</h2>
            <p className="text-xs">
              {profile.venueManager ? "Venue Manager" : "User"}
            </p>
            <p>{profile.bio}</p>

            <div className="flex gap-10">
              <p>Venues: {profile._count.venues}</p>
              <p>Bookings: {profile._count.bookings}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="border rounded py-1 px-3 hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-[#508484] hover:border-[#508484] mb-4  cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="profileForm w-[280px] d:max-w-[600px]"
        >
          <div className="flex flex-col  w-full  items-baseline">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex flex-col  w-full max-w-[600px] items-baseline">
            <label>Avatar URL:</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
            <label>Avatar Alt Text:</label>
            <input
              type="text"
              value={avatarAlt}
              onChange={(e) => setAvatarAlt(e.target.value)}
            />
          </div>

          <div className="flex flex-col  w-full max-w-[600px] items-baseline">
            <label>Banner URL:</label>
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
            />
            <label>Banner Alt Text:</label>
            <input
              type="text"
              value={bannerAlt}
              onChange={(e) => setBannerAlt(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center max-w-[600px] justify-between">
            <label>Venue Manager</label>
            <input
              className="cursor-pointer w-2"
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
          </div>

          <div className="flex gap-4 justify-around my-4">
            <button
              type="submit"
              className="border rounded h-10 px-3 cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0"
            >
              Save
            </button>
            <button
              type="button"
              className="border rounded h-10 px-3 cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
