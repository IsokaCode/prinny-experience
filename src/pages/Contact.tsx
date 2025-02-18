import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">CONTACT US</h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-light tracking-[0.1em] mb-8">GET IN TOUCH</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                NAME
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border font-light tracking-wide focus:outline-none focus:border-[#800000]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border font-light tracking-wide focus:outline-none focus:border-[#800000]"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 border font-light tracking-wide focus:outline-none focus:border-[#800000]"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-light tracking-[0.1em] mb-8">CONTACT INFORMATION</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <Phone className="w-6 h-6 text-[#800000]" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">TELEPHONE</h3>
                <p className="font-light tracking-wide">01923 268663</p>
                <p className="text-sm text-gray-500 font-light tracking-wide mt-1">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <Mail className="w-6 h-6 text-[#800000]" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">EMAIL</h3>
                <p className="font-light tracking-wide">info@prinnyexperience.com</p>
                <p className="text-sm text-gray-500 font-light tracking-wide mt-1">
                  We aim to respond within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <MapPin className="w-6 h-6 text-[#800000]" />
              <div>
                <h3 className="font-light tracking-[0.1em] mb-2">ADDRESS</h3>
                <p className="font-light tracking-wide leading-relaxed">
                  123 Travel Street<br />
                  London, UK<br />
                  SW1A 1AA
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50">
            <h3 className="font-light tracking-[0.1em] mb-4">EMERGENCY CONTACT</h3>
            <p className="font-light tracking-wide text-gray-600 mb-4">
              For urgent matters outside of business hours, please call our 24/7 emergency line:
            </p>
            <p className="text-lg font-light tracking-widest text-[#800000]">
              +44 (0) 7700 900000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;