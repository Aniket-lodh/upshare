import { useState, useEffect, useRef } from "react";
import {
  RiSearchLine,
  RiCompassDiscoverLine,
  RiSearch2Line,
} from "react-icons/ri";
import { Spinner } from "../helpers/Loader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Placeholder: will integrate search API
  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      // TODO: call search API here
      // Simulate search completing (remove when real API is wired)
      const timer = setTimeout(() => setSearching(false), 600);
      return () => clearTimeout(timer);
    } else {
      setSearching(false);
    }
  }, [debouncedQuery]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Search input */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 transition">
        <RiSearchLine fontSize={20} className="text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pins, people..."
          className="w-full bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Results area — three distinct emotional states */}
      <div className="mt-8 flex flex-col items-center justify-center text-center min-h-[40vh]">
        {!debouncedQuery ? (
          /* State 1: No query — inviting discovery */
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <RiSearch2Line className="text-5xl text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Discover something new
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Search for pins, people, or topics that interest you.
            </p>
          </div>
        ) : searching ? (
          /* State 2: Searching — neutral activity, not failure */
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
              <Spinner />
            </div>
            <p className="text-gray-500 text-sm">
              Searching for "{debouncedQuery}"...
            </p>
          </div>
        ) : (
          /* State 3: No results — encouraging, not discouraging */
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
              <RiCompassDiscoverLine className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Try different keywords or browse the feed for inspiration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
