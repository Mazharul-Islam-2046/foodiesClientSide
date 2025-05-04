import Biriyani from "./Sections/Biriyani/Biriyani";
import ExploreMenu from "./Sections/ExploreDiverseMenu/ExploreMenu";
import FastFood from "./Sections/FastFood/FastFood";
import Hero from "./Sections/Hero/Hero";
import IndianCuisine from "./Sections/IndianCuisine/IndianCuisine";
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
        <FastFood/>
        <Biriyani/>
        <IndianCuisine/>
        <ExploreMenu/>
        
        </>
    );
};

export default Home;