import { ConfigProvider } from 'antd';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutVision } from './components/AboutVision';
import { ImpactHub } from './components/ImpactHub';
import { GetInvolved } from './components/GetInvolved';
import { Footer } from './components/Footer';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3B5A2B', // Forest Green
          colorWarning: '#997D2F', // Muted Gold
          borderRadius: 12,
          fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
          colorBgContainer: '#F9F8F6', // Off-white/Alabaster container background
        },
        components: {
          Button: {
            fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
          },
          Card: {
            fontFamily: 'Inter, "Plus Jakarta Sans", sans-serif',
          }
        }
      }}
    >
      <div className="min-h-screen flex flex-col bg-brand-alabaster">
        {/* Sticky Header Navigation */}
        <Navbar />
        
        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* Hero Landing */}
          <Hero />
          
          {/* About Us & Vision Pillars */}
          <AboutVision />
          
          {/* Impact Hub & Regional Projects */}
          <ImpactHub />
          
          {/* Get Involved Campaign Form */}
          <GetInvolved />
        </main>
        
        {/* Footer Connections */}
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
