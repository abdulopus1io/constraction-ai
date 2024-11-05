
"use client"
export default function ErrorPage({ searchParams:any }) {
    const errorMessage = searchParams?.error || "An unknown error occurred.";
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Authentication Error</h2>
          <p className="text-center text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  }
  