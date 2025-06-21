import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import Features from "./_components/Features";
import Solutions from "./_components/Solutions";
import Testimonials from "./_components/Testimonials";
import Blog from "./_components/Blog";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Features/>
      <Solutions/>
      <Testimonials/>
      <Blog/>
    </div>
  );
}