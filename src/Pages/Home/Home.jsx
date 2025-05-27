import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthContext';
import AllRestaurants from '../AllRestaurants/Restaurants';
import Biriyani from './Sections/Biriyani/Biriyani';
import CuisineCarousel from './Sections/Cuisine/CuisineCarousel';
import ExploreMenu from './Sections/ExploreDiverseMenu/ExploreMenu';
import FastFood from './Sections/FastFood/FastFood';
import Hero from './Sections/Hero/Hero';
import IndianCuisine from './Sections/IndianCuisine/IndianCuisine';
import MostPopularFood from './Sections/MostPopularFood/MostPopularFood';
import QuickBites from './Sections/QuickBites/QuickBites';
import SpiceUp from './Sections/SpiceUp/SpiceUp';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <AllRestaurants />
      ) : (
        <div>
          <Hero />
          <CuisineCarousel />

          <div className="">
            <MostPopularFood />
            <SpiceUp />
            <QuickBites />
            <FastFood />
            <Biriyani />
            <IndianCuisine />
            <ExploreMenu />
          </div>
        </div>
      )}

      {/* <AllRestaurants/> */}
    </>
  );
};

export default Home;
