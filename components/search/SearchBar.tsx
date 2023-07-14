// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, placeholder }) => {
  return (
    <form className="flex flex-col">
      <input
        className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
          focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
