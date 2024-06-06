import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

function Search() {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 300)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <label className="flex items-center w-full gap-2 input input-bordered">
            <input type="text" className="grow" placeholder="Search" value={search} onChange={handleSearchChange} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
    )
}

export default Search