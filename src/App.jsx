import Header from './components/Header';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import MenuHighlights from './components/MenuHighlights';
import AtmosphereGallery from './components/AtmosphereGallery';
import Reviews from './components/Reviews';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStory />
        <MenuHighlights />
        <AtmosphereGallery />
        <Reviews />
        <VisitSection />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
