export default function InfoUser({ profileData }: { profileData: any }) {
    if (!profileData) return null;
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <img
          src={profileData.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-600"
        />
        <h1 className="text-2xl font-semibold">{profileData.name}</h1>
        <p className="text-gray-400">{profileData.email}</p>
      </div>
    );
  }
  