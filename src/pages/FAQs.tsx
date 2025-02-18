import React from 'react';

function FAQs() {
  const faqs = [
    {
      question: "How do I book an experience?",
      answer: "You can book an experience by selecting your desired trip and clicking the 'View Trip' button. Follow the booking process. Our team will then confirm your booking within 24 hours."
    },
    {
      question: "What Payment Methods are accepted?",
      answer: "We accept all major credit cards and PayPal. You can also pay with a bank transfer if preferred."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy allows for full refunds up to 30 days before the experience start date. Different terms may apply for specific trips. We recommend reviewing the specific cancellation terms for your chosen experience during the booking process."
    },
    {
      question: "What is the typical group size?",
      answer: "Group sizes vary by experience but typically range from 8-16 people. This intimate setting ensures personal attention and the opportunity to truly immerse yourself in the destination. Some experiences may accommodate smaller or larger groups."
    },
    {
      question: "How physically demanding are the experiences?",
      answer: "Each experience has a detailed activity level rating in its description. These range from 'Easy' (suitable for all fitness levels) to 'Challenging' (requiring good physical fitness). Contact us if you need guidance on choosing the right experience for you."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-light tracking-[0.15em] mb-12">FREQUENTLY ASKED QUESTIONS</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md p-8">
            <h2 className="text-xl font-light tracking-[0.1em] text-[#800000] mb-4">{faq.question}</h2>
            <p className="font-light tracking-wide leading-relaxed text-gray-600">{faq.answer}</p>
          </div>
        ))}

        <div className="bg-gray-50 p-8 mt-12">
          <h2 className="text-xl font-light tracking-[0.1em] mb-4">STILL HAVE QUESTIONS?</h2>
          <p className="font-light tracking-wide text-gray-600 mb-6">
            Our team is here to help you plan your perfect experience.
          </p>
          <button className="bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQs;