import Navbar from "../../SharedComponents/Navbar/Navbar.jsx"
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";

const Menu = () => {
    return (
        <>
            <Banner />
            <div className="flex relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <SideFilterBar />
                <ItemSearchResult />
            </div>

        </>
    );
};

export default Menu;