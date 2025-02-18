import React from 'react';
import { ArrowRight } from 'lucide-react';

function Careers() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">CAREERS</h1>
      <div className="max-w-4xl">
        <p className="text-lg font-light tracking-wide leading-relaxed mb-12">
          Join our team and help create unforgettable experiences for travelers around the world. 
          We're always looking for passionate individuals who share our vision of making travel more 
          meaningful and accessible.
        </p>

        <h2 className="text-2xl font-light tracking-[0.1em] mb-8">CURRENT OPENINGS</h2>
        <div className="space-y-6">
          <div className="bg-white p-8 shadow-md group hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-light tracking-wide mb-2">Travel Experience Curator</h3>
                <p className="text-gray-600 font-light tracking-wide">Full-time • London, UK</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-block bg-[#800000] bg-opacity-10 text-[#800000] px-4 py-1 text-sm font-light tracking-[0.1em]">
                  NEW POSITION
                </span>
              </div>
            </div>
            <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-6">
              Design and curate unique travel experiences that inspire and delight our customers. 
              Work closely with local partners to create authentic, meaningful journeys that showcase 
              the best of each destination.
            </p>
            <button className="group inline-flex items-center bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300">
              APPLY NOW
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="bg-white p-8 shadow-md group hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-light tracking-wide mb-2">Customer Experience Specialist</h3>
                <p className="text-gray-600 font-light tracking-wide">Full-time • Remote</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-block bg-[#6B9080] bg-opacity-10 text-[#6B9080] px-4 py-1 text-sm font-light tracking-[0.1em]">
                  REMOTE FRIENDLY
                </span>
              </div>
            </div>
            <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-6">
              Help our customers plan their perfect trips and provide exceptional support throughout their journey. 
              Be the bridge between our travelers and their dream experiences, ensuring every interaction exceeds expectations.
            </p>
            <button className="group inline-flex items-center bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300">
              APPLY NOW
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="bg-white p-8 shadow-md group hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-light tracking-wide mb-2">Digital Marketing Manager</h3>
                <p className="text-gray-600 font-light tracking-wide">Full-time • London, UK</p>
              </div>
            </div>
            <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-6">
              Lead our digital marketing initiatives to share our unique travel experiences with the world. 
              Create compelling content and strategies that inspire travelers to embark on unforgettable journeys.
            </p>
            <button className="group inline-flex items-center bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300">
              APPLY NOW
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 p-8">
          <h2 className="text-2xl font-light tracking-[0.1em] mb-4">JOIN OUR TEAM</h2>
          <p className="font-light tracking-wide text-gray-600 mb-6">
            Don't see a position that matches your skills? We're always interested in meeting talented 
            individuals who are passionate about travel and creating exceptional experiences.
          </p>
          <button className="group inline-flex items-center border border-[#800000] text-[#800000] px-8 py-3 font-light tracking-[0.15em] hover:bg-[#800000] hover:text-white transition-all duration-300">
            SEND OPEN APPLICATION
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Careers;