import RefreshButton from "./RefreshButton";

export default function ErrorDisplay() {
  return (
    <div className="text-center py-12">
      <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Rate Limited
        </h2>
        <p className="text-white/80 mb-4">
          The PokéAPI is currently rate-limiting requests. Please wait a moment
          and refresh the page.
        </p>
        <RefreshButton className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors">
          Refresh Page
        </RefreshButton>
      </div>
    </div>
  );
}
