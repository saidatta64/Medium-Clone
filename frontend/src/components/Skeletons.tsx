import { Appbar } from "./Appbar";
export const FullBlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="flex justify-center py-10">
        <div className="grid grid-cols-12 gap-8 px-6 md:px-10 max-w-screen-lg w-full">
          <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
            <hr className="my-4" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 w-full animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="h-6 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Skeleton(){
  return (
      <div className="flex justify-center ">
                  <div className="justify-center w-screen max-w-screen-sm bg-slate-50">
                      {[...Array(3)].map((_, i) => (
                          <div key={i} className="p-4 animate-pulse">
                              <div className="flex items-center space-x-4">
                                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                              </div>
                              <div className="h-6 w-3/4 bg-gray-300 rounded my-2"></div>
                              <div className="h-4 w-full bg-gray-300 rounded"></div>
                              <div className="h-4 w-5/6 bg-gray-300 rounded mt-1"></div>
                              <div className="h-4 w-20 bg-gray-300 rounded mt-2"></div>
                          </div>
                      ))}
                  </div>
              </div>
  )
}