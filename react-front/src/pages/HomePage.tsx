import LandingCard from '../components/cards/LandingCard';
import Footer from '../components/sections/Footer';
import UserReview from '../components/cards/UserReview';
import ChartCard from '../components/cards/ChartCard';

//HomePage component, displays the home page and its components
function HomePage() {
  console.log('HomePage');
  return (
    <div className='flex flex-col gap-y-8 relative w-full h-full overflow-y-scroll custom-scrollbar backdrop-blur-md bg-gray-200 bg-opacity-20'>
      <LandingCard />
      <ChartCard />
      <UserReview />
      <Footer />
    </div>
  );
};

export default HomePage;

