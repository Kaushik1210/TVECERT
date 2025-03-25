import React from "react";
import Button from "../../Components/Button";
import { Helmet } from "react-helmet";
import OnlinepayNavbar from "./OnlinepayNavbar";

const OnlinePayHerosec = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      
      <section
        loading="lazy"
        className="relative h-screen bg-careerherobg bg-no-repeat w-full bg-cover"
      >
        <OnlinepayNavbar/>
        <div className="w-full h-full flex items-center">
          <article
            className="ml-100 flex-col
              max-md:justify-center 
              max-md:items-center               
              max-md:m-14"
          >
            <h1 className="text-[35px] text-white font-semibold capitalize">
              Online Payment
              <br className="max-md:hidden" />
            </h1>
           
            <div
              className="mt-4 flex gap-6 
                   max-md:justify-center                   
                   max-md:items-center
                   max-sm:flex-col"
            >
              <a
                href="#careerList"
                
              >
                <Button text="Online Payment" />
              </a>
            </div>
          </article>
        </div>
      </section>
      
    </>
  );
};

export default OnlinePayHerosec;