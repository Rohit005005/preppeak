import React from "react";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:flex lg:h-screen">
        <div className="p-10 text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-extrabold ">
            Transform Your Interview Performance 
             
          </h1>
          <strong className="text-3xl font-extrabold text-primary sm:block">
               Practice with AI, Receive Instant Feedback and Boost Your Ratings!
            </strong>

          <p className="mt-4 text-lg text-gray-500 font-medium w-[90%]">
            Experience a real interview scenario with our AI-based platform,
            where you can practice for free, receive valuable feedback, and get
            rated on your performance to prepare you for the real deal.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="/dashboard"
            >
              Lets Start
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
