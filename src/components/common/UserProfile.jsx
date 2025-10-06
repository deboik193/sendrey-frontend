const UserProfile = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700 text-sm sm:text-base">
        <span>back</span>
        <span className="font-semibold text-base sm:text-lg">Contact Info</span>
        <span>edit</span>
      </div>

      <div className="flex flex-col items-center py-6 px-4 text-center">
        <p className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4"></p>
        <p className="text-lg sm:text-xl font-semibold">name</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">number</p>
      </div>

      <div className="flex justify-around py-4 border-t border-b border-gray-300 dark:border-gray-700 text-sm sm:text-base">
        <p>audio</p>
        <p>video</p>
        <p>search</p>
      </div>

      <div className="px-4 py-5 border-b border-gray-300 dark:border-gray-700">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">
          media link and docs
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
        </div>
      </div>

      <div className="px-4 py-5 text-sm sm:text-base">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">contact detail</p>
      </div>
    </>
  );
};

export default UserProfile;
