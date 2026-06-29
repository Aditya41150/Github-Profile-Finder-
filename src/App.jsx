import { useState } from "react"
import axios from "axios";
import { GitBranch, Search, Link, Calendar, MapPin, Building2, Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";

function App() {
  const [username, setUsername] = useState(''); // for input  field
  const [profile, setProfile] = useState(null); //  api respose object

  const getData = async () => {
    if (username === "") {
      alert("Please Enter a username...")
      return;
    }

    const api = `https://api.github.com/users/${username}`

    try {
      const result = await axios.get(api)
      setProfile(result.data);

      //console.log(result.data);
    } catch (error) {
      const status = error.response.status;
      if (status === 404) {
        alert("User not found")
      }
      else if (status === 403) {
        alert("Too many requests try again later...")
      }
      else if (status === 401) {
        alert("Invalid or missing API key.")
      }
      else {
        alert("Something went wrong.")
      }
      console.log(error);

    }

  };

  // date formatting
  const formattedDate = profile
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "";



  return (
    <>
      <div className="min-h-screen font-geist flex flex-col items-center pt-5 px-4">
        < GitBranch className="text-white mb-5 size-10" />
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">GitHub Profile Finder</h1>
        <p className="text-[#a1a1a1] mt-2 text-center">Search any GitHub user and explore their public profile.</p>

        {/* search bar and search button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full max-w-2xl">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") getData(); }} placeholder="Enter Github username..." type="text" className="border border-[#2e2f2f] placeholder-[#a1a1a1] text-white  bg-[#171717]   rounded-2xl px-12 py-2 w-full" />
          </div>
          <button onClick={getData} className="border rounded-2xl px-6 py-2 bg-white text-black font-medium w-full sm:w-auto">Search</button>
        </div>

        {/* api results niche dikha do*/}

        {
          profile && (
            <div className="main w-full max-w-4xl px-2">
              <div className="flex flex-col md:flex-row gap-6 text-white border border-[#2e2f2f] w-full mt-15 rounded-2xl bg-[#171717] p-6 items-center md:items-start">
                <img className="h-30 w-30 object-cover border border-[#2e2f2f] rounded-2xl shrink-0" src={profile.avatar_url} alt="Github Avatar" />

                <div className="content flex flex-col gap-2 w-full text-center md:text-left">
                  <h1 className="text-3xl font-bold">
                    {profile.name}
                  </h1>
                  <h2 className="text-[#a1a1a1]">
                    @{profile.login}
                  </h2>
                  <p className="mt-3 mb-4">
                    {profile.bio}
                  </p>
                  {/* details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 justify-items-center md:justify-items-start">

                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-[#a1a1a1]" />
                        <span className="text-[#a1a1a1]">{profile.location}</span>
                      </div>
                    )}

                    {profile.company && (
                      <div className="flex items-center gap-2">
                        {/* company logo */}
                        <Building2 className="size-4 text-[#a1a1a1]" />
                        <span className="text-[#a1a1a1]">{profile.company}</span>
                      </div>
                    )}

                    {profile.blog && (
                      <div className="flex items-center gap-2">
                        <Link className="size-4 text-[#a1a1a1]" />
                        <a href={profile.blog} target="_blank" rel="noreferrer" className="text-[#a1a1a1] hover:underline">Website</a>
                      </div>
                    )}


                    <div className="flex items-center gap-2"  >
                      <Calendar className="size-4 text-[#a1a1a1]" />
                      <span className="text-[#a1a1a1]" >Joined {formattedDate}</span>

                    </div>
                  </div>
                </div>

              </div>

              <div className="cards mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">

                <div className="repos flex flex-col justify-center items-center border h-30 rounded-2xl border-[#2e2f2f] bg-[#171717]">

                  <h1 className="text-white text-3xl font-bold">
                    {profile.public_repos}
                  </h1>
                  <p className="text-[#a1a1a1]">Repositories</p>
                </div>

                <div className="followers flex flex-col justify-center items-center border h-30 rounded-2xl border-[#2e2f2f] bg-[#171717]">
                  <h1 className="text-white text-3xl font-bold">
                    {profile.followers}
                  </h1>
                  <p className="text-[#a1a1a1]">Followers</p>
                </div>

                <div className="following flex flex-col justify-center items-center border h-30 rounded-2xl border-[#2e2f2f] bg-[#171717]">
                  <h1 className="text-white text-3xl font-bold">
                    {profile.following}
                  </h1>
                  <p className="text-[#a1a1a1]">Following</p>
                </div>

                <div className="Gists border flex flex-col justify-center items-center h-30 rounded-2xl border-[#2e2f2f] bg-[#171717]">
                  <h1 className="text-white text-3xl font-bold">
                    {profile.public_gists}
                  </h1>
                  <p className="text-[#a1a1a1]">Gists</p>
                </div>

              </div>
            </div>
          )
        }

        <div className="footer mt-auto  mb-2 items-center text-white flex gap-2 rounded-2xl">
          <span>Made by <a href="https://github.com/Aditya41150" className="hover:underline">Aditya</a> with</span>
          <FaHeart />
        </div>

      </div>
    </>
  )
}

export default App