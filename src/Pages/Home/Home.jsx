import Hero from "./Sections/Hero/Hero";
import MostPopularFood from "./Sections/MostPopularFood/MostPopularFood";
import QuickBites from "./Sections/QuickBites/QuickBites";
import SpiceUp from "./Sections/SpiceUp/SpiceUp";

const Home = () => {
    return (
        <>
        <Hero/>
        <MostPopularFood/>
        <SpiceUp/>
        <QuickBites/>
        </>
    );
};

export default Home;