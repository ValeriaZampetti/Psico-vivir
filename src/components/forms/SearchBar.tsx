import React from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

// TODO - Terminar luego lo de UserChat
function SearchBar(props: IProps) {
  return (
    <div id="searchBar" className="border-b-2 border-gray-400 flex">
      <div id="searchForm" className="p-2"></div>
      <input
        className="bg-transparent text-black  placeholder:text-gray-400 text-ellipsis
          border-none outline-none w-[70%]  md:w-[90%] self-center flex py-1 text-center"
        type="text"
        placeholder="Buscar"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
