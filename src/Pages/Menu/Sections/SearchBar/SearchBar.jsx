

const SearchBar = ({setSearchName, setFilters}) => {

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        setFilters({ searchName: e.target.value });
    }





    return (
        <>
            <input type="text"
                placeholder="Search for items..."
                className="py-2 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => handleSearch(e)} />
        </>
    );
};

export default SearchBar;