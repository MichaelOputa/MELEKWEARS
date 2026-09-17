import Hero from '@/components/home/Hero';
import BrandStatement from '@/components/home/BrandStatement';
import Collections from '@/components/home/Collections';
import SignaturePieces from '@/components/home/SignaturePieces';
import Craftsmanship from '@/components/home/Craftsmanship';
import MelekStandard from '@/components/home/MelekStandard';
import About from '@/components/home/About';
import Milestones from '@/components/home/Milestones';
import Packaging from '@/components/home/Packaging';
import Journal from '@/components/home/Journal';
import GlobalShipping from '@/components/home/GlobalShipping';
import type { Product } from '@/types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onQuickView: (product: Product) => void;
}

export default function HomePage({ onNavigate, onQuickView }: HomePageProps) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <BrandStatement />
      <Collections onNavigate={onNavigate} />
      <SignaturePieces onQuickView={onQuickView} onNavigate={onNavigate} />
      <Craftsmanship />
      <MelekStandard />
      <About />
      <Milestones />
      <Packaging />
      <Journal onNavigate={onNavigate} />
      <GlobalShipping />
    </>
  );
}
