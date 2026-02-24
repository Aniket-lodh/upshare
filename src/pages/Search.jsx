import { useState, useEffect, useRef } from "react";
import { RiSearchLine, RiCompassDiscoverLine } from "react-icons/ri";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
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
      // TODO: call search API here
    }
  }, [debouncedQuery]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Search input */}
      <div className="flex items-center gap-2 px-3 py-2 bg-color-bg-tertiary rounded-lg">
        <RiSearchLine fontSize={20} className="text-color-font-tertiary" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pins, people..."
          className="w-full bg-transparent focus:outline-none text-color-font-primary"
        />
      </div>

      {/* Results area */}
      <div className="mt-8 flex flex-col items-center justify-center min-h-[40vh] gap-3">
        {!debouncedQuery ? (
          <>
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <RiSearchLine fontSize={24} className="text-color-primary-blue" />
            </div>
            <p className="text-color-font-tertiary text-sm">
              Start typing to search
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <RiCompassDiscoverLine fontSize={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-color-font-primary">
              No results found
            </h3>
            <p className="text-color-font-tertiary text-sm text-center max-w-xs">
              Try different keywords or browse the feed.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
