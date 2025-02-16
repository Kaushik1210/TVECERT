import React from "react";
import Button from "../../Components/Button";
import image from "../../Assets/dummy";
import ClientsSec from "./ClientsSec";

const Aboutus = () => {
  return (
    <div className="relative">
      <section
        id="aboutus"
        className=" relative mx-100  my-50
                                      max-lg:mx-20
                                      max-[850px]:mx-14
                                      max-sm:mx-6
                                      "
      >
        {/* aboutus  */}
        <div
          className="flex mb-50 gap-5
                      max-[850px]:flex-col"
        >
          <div className="flex-1 pr-10  content-center">
            <p className="underline underline-offset-4">About us</p>
            <p className=" capitalize text-SH font-semibold text-ldarkblue ">
              a world-class company in the field of Certification & Professional Training Services
            </p>
            <div className=" w-[250px] border border-darkblue hidden max-[850px]:block" />
          </div>

          <div
            className="flex-1 flex flex-col gap-3 pl-10 border-l 
                        max-[850px]:border-none
                        max-[850px]:pl-0"
          >
            <div className="  flex flex-col gap-2 list-none  text-darkblue">
              <ul class="list-none space-y-1">
                <li class="flex items-start">
                  <span class="before:content-['•'] before:mr-1 before:text-black"></span>
                  TVE is one of the leading & fast growing Certification bodies in
                  India.
                </li>
                <li class="flex items-start">
                  <span class="before:content-['•'] before:mr-1 before:text-black"></span>
                  TVE is offering Certification Services in India and across the
                  globe.
                </li>
                <li class="flex items-start">
                  <span class="before:content-['•'] before:mr-1 before:text-black"></span>
                  TVE has its own regional assessor throughout India and has
                  operations World Wide. TVE Auditors are highly qualified with
                  huge industrial Audit Experience. They are Professional in
                  their approach.
                </li>
                <li class="flex items-start">
                  <span class="before:content-['•'] before:mr-1 before:text-black"></span>
                  TVE understands the importance of impartiality in carrying out its Management System Certification activities. TVE manages conflict of interest &  ensures the objectivity of the Management System Certification activities
                </li>
              </ul>

             
            </div>
            {/* <div className="flex max-sm:justify-center">
              <Button text="More About TVE" />
            </div> */}
          </div>
        </div>

       

        {/* <ClientsSec/> */}

        {/* our partners */}
        <div className=" mb-10">
          <p className="flex justify-center text-24 underline underline-offset-3  font-medium">
            Our Partners
          </p>
          <div
            className="flex justify-between mt-5 items-center
                        max-[850px]:flex-col  
                        max-[850px]:gap-10  
                        "
          >
            <img className="h-45 " src={image.ias} alt="" />
            <img className="h-45 " src={image.iaf} alt="" />
            <img className="h-45 " src={image.cqiirca} alt="" />
            <img className="h-45 " src={image.eg} alt="" />
            <img className="h-45 " src={image.eosh} alt="" />
          </div>
        </div>


        <ClientsSec/>

      </section>

      <div className=" h-[800px] w-[550px] absolute bg-bbgufill top-0 left-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]" />
      <div className=" h-[800px] w-[550px] absolute bg-sbgdline top-[400px] right-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px] max-sm:top-[600px]" />
    </div>
  );
};

export default Aboutus;
