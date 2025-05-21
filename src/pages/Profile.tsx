import { useEffect, useState } from "react";
import { Profile as ProfileType } from "../types/Profile";

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
          `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
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
        `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
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
    <div>
      {!isEditing ? (
        <>
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
          <h2>Welcome, {profile.name}!</h2>
          <p>{profile.bio}</p>
          <p>{profile.venueManager ? "Venue Manager" : "User"}</p>

          <p>Venues: {profile._count.venues}</p>
          <p>Bookings: {profile._count.bookings}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
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

          <div>
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

          <div>
            <label>
              <input
                type="checkbox"
                checked={venueManager}
                onChange={(e) => setVenueManager(e.target.checked)}
              />{" "}
              Venue Manager
            </label>
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
