import { useContext } from "react";
import AllRestaurants from "../AllRestaurants/Restaurants";
import Biriyani from "./Sections/Biriyani/Biriyani";
import ExploreMenu from "./Sections/ExploreDiverseMenu/ExploreMenu";
import FastFood from "./Sections/FastFood/FastFood";
import Hero from "./Sections/Hero/Hero";
import IndianCuisine from "./Sections/IndianCuisine/IndianCuisine";
import MostPopularFood from "./Sections/MostPopularFood/MostPopularFood";
import QuickBites from "./Sections/QuickBites/QuickBites";
import SpiceUp from "./Sections/SpiceUp/SpiceUp";
import { AuthContext } from "../../providers/AuthProvider/AuthContext";

const Home = () => {

  const { user } = useContext(AuthContext);


  return (
    <>
    {
      user ? <AllRestaurants/> 
      
      :

      <div>
      <Hero />
      <div className="py-12">
        <MostPopularFood />
        <SpiceUp />
        <QuickBites />
        <FastFood />
        <Biriyani />
        <IndianCuisine />
        <ExploreMenu />
      </div>
      </div>
    }
      
      {/* <AllRestaurants/> */}
    </>
  );
};

export default Home;
