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
          className="flex mb-5 gap-5
                      max-[850px]:flex-col"
        >
          <div className="flex-1 pr-10  content-center">
            <p className="underline underline-offset-4">About us</p>
            <p className=" capitalize text-SH font-semibold text-ldarkblue ">
              a world-class company in the field of Certification & Professional
              Training Services
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
                  TVE is one of the leading & fast growing Certification bodies
                  in India.
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
                  TVE understands the importance of impartiality in carrying out
                  its Management System Certification activities. TVE manages
                  conflict of interest & ensures the objectivity of the
                  Management System Certification activities
                </li>
                
              </ul>
            </div>
            {/* <div className="flex max-sm:justify-center">
              <Button text="More About TVE" />
            </div> */}
          </div>
        </div>
        <div className="  flex flex-col gap-2 mb-5 list-none  text-darkblue">
              <ul class="list-none space-y-3">
                <li class=" items-start indent-5 ">
                  <strong>TVE CERTIFICATION SERVICES & TVE INTERNATIONAL ACADEMY</strong> operates as Management System Certification - Training Body and has its clients in both Certification and Training over 15 countries across the globe.
                </li>
                <li class=" items-start indent-5 ">
                  <strong>TVE CERTIFICATION SERVICES (MSCB No. 129)</strong> is accredited by IAS - International Accreditation Service (American Accreditation) - Member of IAF for ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 and ISO 22000:2018.
                </li>
                <li class=" items-start indent-5 ">
                  <strong>TVE INTERNATIONAL ACADEMY (ATP No. - 6023829)</strong> is the Approved Training Partner of CQI & IRCA to deliver Auditor / Lead Auditor Training Courses (CQI - Chartered Quality Institute and IRCA - International Registered of Certificated Auditors) in QMS- ISO 9001:2015,OHSMS - ISO 45001:2018, EMS - ISO 14001:2015, FSMS - 22000:2018, ISMS - ISO 27001:2013 and EnMS - ISO 50001:2018.


                </li>
                <li class=" items-start indent-5 ">
                  <strong>TVE INTERNATIONAL ACADEMY</strong> is the Recognised Training Partner of Exemplar Global to provide trainings in different ISO Standards like QMS - ISO 9001:2015, OHSMS - ISO 45001:2018, EMS - ISO 14001:2015, FSMS - 22000:2018, ISMS - ISO 27001:2013 and EnMS - ISO 50001:2018.


                </li>
                <li class=" items-start indent-5 ">
                  <strong>TVE INTERNATIONAL ACADEMY (ATC No ATC1076)</strong> is the Approved Training Centre of EOSH UK Training Partner to deliver Level 2, Level 3 & Level 4 Training Courses in Health & Safety, Fire Safety, Environment, Environment Sustainability, Lifting & Rigging, First Aid, Scaffolding.


                </li>


               
                
              </ul>
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
            <div className=" flex-1 flex justify-center   p-2 w-full">
              
              <img src={image.ias} className=" h-32" alt="" />
            </div>
            <div className=" flex-1 flex justify-center p-5 w-full">
            <img className=" h-20 " src={image.iaf} alt="" />
            </div>
            <div className=" flex-1 flex justify-center p-5 w-full">
            <img className="h-24  " src={image.cqiirca} alt="" />
            </div>
            <div className=" flex-1 flex justify-center p-5 w-full">
            
            <img className=" h-16  " src={image.eg} alt="" />
            </div>
            <div className=" flex-1 flex justify-center p-5 w-full">
            <img className="h-28  " src={image.eosh} alt="" />
            </div>
           
          </div>
        </div>

        <ClientsSec />
      </section>

      <div className=" h-[800px] w-[550px] absolute bg-bbgufill top-0 left-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]" />
      <div className=" h-[800px] w-[550px] absolute bg-sbgdline top-[400px] right-0 bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px] max-sm:top-[600px]" />
    </div>
  );
};

export default Aboutus;
