import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">ABOUT US</h1>
      <div className="max-w-4xl">
        <p className="text-lg font-light tracking-wide leading-relaxed mb-8">
          Welcome to Prinny Experience, where we turn ordinary journeys into extraordinary adventures. At Prinny Experience, we believe that travel is more than just visiting new places—it’s about creating meaningful connections with the world, its cultures, and its people.
        </p>
        <p className="text-lg font-light tracking-wide leading-relaxed mb-8">
         Founded with a vision to make authentic and immersive travel experiences accessible to everyone,
         we specialize in crafting unique journeys that go beyond the typical tourist trails. By collaborating with local guides and experts, we ensure that every adventure is rich in culture, history, and authenticity.
        </p>
        <p className="text-lg font-light tracking-wide leading-relaxed mb-12">
         Whether you’re seeking heart-pounding adventures, deep cultural immersion, or serene retreats, our carefully
         curated experiences are designed to leave you with unforgettable memories. From hidden gems to iconic landmarks, we take pride in offering a perfect balance of exploration, comfort, and discovery
        </p>
        <p className="text-lg font-light tracking-wide leading-relaxed mb-12">
         Join us at Prinny Experience and let us guide you in uncovering the world’s most remarkable destinations. Your next extraordinary adventure starts here.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <h3 className="text-xl font-light tracking-[0.1em] mb-4">OUR MISSION</h3>
            <p className="font-light tracking-wide text-gray-600">
              To create transformative travel experiences that inspire, educate, and connect people across cultures.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-light tracking-[0.1em] mb-4">OUR VALUES</h3>
            <p className="font-light tracking-wide text-gray-600">
              Authenticity, sustainability, and respect for local communities guide every experience we create.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-light tracking-[0.1em] mb-4">OUR PROMISE</h3>
            <p className="font-light tracking-wide text-gray-600">
              To deliver exceptional service and unforgettable moments on every journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;