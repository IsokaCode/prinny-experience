import React from 'react';
import { Shield, Heart, AlertCircle, Check } from 'lucide-react';

function Safety() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">SAFETY FIRST</h1>
      
      <div className="max-w-4xl">
        <p className="text-lg font-light tracking-wide leading-relaxed mb-12">
          Your safety and well-being are our highest priorities. We maintain rigorous safety standards 
          across all our experiences, ensuring you can explore with confidence and peace of mind.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 shadow-md">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-[#800000] mr-4" />
              <h2 className="text-2xl font-light tracking-[0.1em]">OUR COMMITMENT</h2>
            </div>
            <p className="font-light tracking-wide text-gray-600 leading-relaxed">
              We carefully vet all our experiences and partners to ensure they meet our strict safety standards. 
              Regular assessments and updates to our safety protocols ensure we maintain the highest levels of security.
            </p>
          </div>

          <div className="bg-white p-8 shadow-md">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-[#800000] mr-4" />
              <h2 className="text-2xl font-light tracking-[0.1em]">TRAVEL INSURANCE</h2>
            </div>
            <p className="font-light tracking-wide text-gray-600 leading-relaxed">
              We recommend comprehensive travel insurance for all our experiences. Our team can help you 
              find the right coverage to ensure you're protected throughout your journey.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 shadow-md mb-16">
          <h2 className="text-2xl font-light tracking-[0.1em] mb-8">COVID-19 SAFETY MEASURES</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-[#800000] mr-4 mt-1" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">ENHANCED CLEANING</h3>
                <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                  All accommodations and transport vehicles undergo thorough sanitization following 
                  strict hygiene protocols to ensure your safety.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-[#800000] mr-4 mt-1" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">SMALL GROUPS</h3>
                <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                  We maintain limited group sizes to ensure safe distancing during activities while 
                  preserving the intimate nature of our experiences.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-[#800000] mr-4 mt-1" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">LOCAL GUIDELINES</h3>
                <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                  We strictly adhere to all local health and safety regulations in each destination, 
                  adapting our protocols as needed to ensure compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8">
          <h2 className="text-2xl font-light tracking-[0.1em] mb-6">SAFETY CERTIFICATIONS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Check className="w-6 h-6 text-[#800000] mr-3" />
              <p className="font-light tracking-wide text-gray-600">
                World Travel and Tourism Council Safe Travels Certification
              </p>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-[#800000] mr-3" />
              <p className="font-light tracking-wide text-gray-600">
                International Safety Organization (ISO) 45001 Certified
              </p>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-[#800000] mr-3" />
              <p className="font-light tracking-wide text-gray-600">
                Adventure Travel Trade Association Safety Standards
              </p>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-[#800000] mr-3" />
              <p className="font-light tracking-wide text-gray-600">
                Global Sustainable Tourism Council Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Safety;