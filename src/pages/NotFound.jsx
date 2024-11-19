const NotFound = () => {
  return (
    <div className="m-auto mx-9 max-w-screen-xl text-left">
      <div className="text-sm">
        <div className="mx-auto max-w-4xl p-6">
          <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-center border-b border-gray-200 pb-4 pr-4">
              <h2 className="text-center text-2xl font-bold">
                404 - Page Not Found
              </h2>
            </div>
            <div className="text-center text-gray-600">
              <p>The page you are looking for does not exist.</p>
              <a
                href="/"
                className="mt-4 inline-block rounded-lg bg-blue-900 px-4 py-3 text-white hover:cursor-pointer hover:bg-blue-800"
              >
                Go back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
