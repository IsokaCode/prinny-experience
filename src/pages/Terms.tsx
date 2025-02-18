import React from 'react';

function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">TERMS & CONDITIONS</h1>
      
      <div className="max-w-4xl">
        <div className="bg-white shadow-md p-12">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">1. BOOKING TERMS</h2>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed mb-4">
                By booking an experience with Prinny Experience, you agree to these terms and conditions. 
                All bookings are subject to availability and confirmation.
              </p>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                We reserve the right to modify or cancel any booking in accordance with our cancellation policy 
                or in circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">2. PAYMENT</h2>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed mb-4">
                Full payment is required to confirm your booking. We accept major credit cards and secure online payments.
                All prices are listed in GBP unless otherwise specified.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-light tracking-wide text-gray-600">
                <li>Deposit requirements vary by experience type</li>
                <li>Balance payments are due 60 days before departure</li>
                <li>Late payments may result in booking cancellation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">3. CANCELLATION POLICY</h2>
              <div className="space-y-4">
                <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                  Our standard cancellation policy is as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-light tracking-wide text-gray-600">
                  <li>30+ days before departure: Full refund minus administrative fees</li>
                  <li>15-29 days before departure: 50% refund</li>
                  <li>14 days or less before departure: No refund</li>
                  <li>Special terms may apply for certain experiences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">4. CHANGES TO BOOKINGS</h2>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                Changes to bookings may be possible subject to availability and may incur additional charges.
                Please contact our customer service team for assistance with changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">5. INSURANCE</h2>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                We strongly recommend that all participants obtain comprehensive travel insurance.
                This should cover medical expenses, personal accidents, and trip cancellation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light tracking-[0.1em] text-[#800000] mb-6">6. LIABILITY</h2>
              <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                While we take all reasonable precautions to ensure the safety and enjoyment of our customers,
                participation in activities is at your own risk. We accept no liability for loss, damage, or injury
                except where proven to be caused by our negligence.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-12 border-t">
            <p className="font-light tracking-wide text-gray-600 leading-relaxed text-center">
              Last updated: March 2024. For any questions regarding these terms, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;