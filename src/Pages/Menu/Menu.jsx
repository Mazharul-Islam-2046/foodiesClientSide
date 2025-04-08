import Navbar from "../../SharedComponents/Navbar/Navbar.jsx"
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";

const Menu = () => {
    return (
        <>
            <Banner />
            <div className="flex">
                <SideFilterBar className="basis-2/5" />
                <ItemSearchResult className="basis-3/5 " />
            </div>

        </>
    );
};

export default Menu;