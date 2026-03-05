import React from 'react';
import Hero from '../components/Hero';
import Why from '../components/Why';
import WhyNow from '../components/WhyNow';
import LocalAnchor from '../components/LocalAnchor';
import AutonomySection from '../components/AutonomySection';
import VideoSection from '../components/VideoSection';
import Candidates from '../components/Candidates';
import AboutMovement from '../components/AboutMovement';
import Program from '../components/Program';
import JoinForm from '../components/JoinForm';
import DonateForm from '../components/DonateForm';
import ContactForm from '../components/ContactForm';
import Transparency from '../components/Transparency';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyNow />
      <Why />
      <LocalAnchor />
      <AutonomySection />
      <VideoSection />
      <Candidates />
      <AboutMovement />
      <Program />
      <JoinForm />
      <DonateForm />
      <ContactForm />
      <Transparency />
    </>
  );
}
