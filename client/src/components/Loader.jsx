import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">

      {/* SPINNER */}
      <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">

        <Loader2
          size={32}
          className="animate-spin text-blue-500"
        />

      </div>

      {/* TEXT */}
      <p className="mt-4 text-sm sm:text-base text-gray-400 font-medium">
        Loading...
      </p>

    </div>
  );
}