const SkeletonCardItem = () => {
  return (
    <div className="flex flex-col justify-start h-auto overflow-hidden duration-75 bg-white shadow-lg animate-pulse rounded-xl shadow-gray-400/10">
      <div className="relative grid w-full mb-1 bg-gray-200 h-44"></div>
      <div className="p-4">
        <div className="h-8 mb-4 w-[40%] bg-gray-200 rounded-md"></div>
        <div className="h-4 mb-1 bg-gray-200 rounded-md"></div>
        <div className="h-4 mb-1 bg-gray-200 rounded-md"></div>
        <div className="h-4 mb-4 bg-gray-200 rounded-md"></div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
          <div className="flex items-center overflow-hidden rounded-lg h-9">
            <div className="w-8 h-8 bg-gray-200"></div>
            <div className="w-10 h-8 bg-gray-100"></div>
            <div className="w-8 h-8 bg-gray-200"></div>
          </div>
        </div>

        <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonCardItem;
