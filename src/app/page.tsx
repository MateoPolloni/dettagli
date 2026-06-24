import Hero360 from '@/components/sections/Hero360';
import Philosophy from '@/components/sections/Philosophy';
import ServicesPreview from '@/components/sections/ServicesPreview';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <Hero360 />
      <Philosophy />
      <ServicesPreview />
      <Process />
      <Testimonials />
    </>
  );
}
