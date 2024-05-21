/*import PageContent from '../components/elements/PageContent';

function HomePage() {
    return (
        <PageContent title="Welcome!">
            <p>Browse all our amazing events!</p>
        </PageContent>
    );
}

export default HomePage;*/

// pages/HomePage.tsx

import React from 'react';
import ImageCard from '../components/ImageCard';
import MainContainer from '../components/MainContainer';
import Footer from '../components/Footer';
import Sponsors from '../components/elements/Sponsors';

const HomePage: React.FC = () => {
  const imageCardProps = {
    title: 'Start Your Journey',
    description: 'Enjoy creating and sharing events!',
    buttonText: 'Start Journey',
    imageUrl: '../src/assets/home.png',
  };

  const cards = [
    {
      title: 'Header 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },

    {
      title: 'Header 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
    {
      title: 'Header 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg', // Add your image URL here
    },
  ];

  return (
    <div className='flex flex-col gap-y-20 relative w-full h-full overflow-y-scroll custom-scrollbar backdrop-blur-md bg-gray-200 bg-opacity-20'>
      {/* <img src="https://tailwindui.com/img/beams-pricing.png" alt="" className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none z-50"></img> */}
      <ImageCard {...imageCardProps} />
      <MainContainer cards={cards} />
      <Footer />
    </div>
  );
};

export default HomePage;

