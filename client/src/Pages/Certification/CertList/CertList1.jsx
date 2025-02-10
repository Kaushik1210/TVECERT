import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import image from "../../../Assets/dummy";

const CertList1 = () => {
  const [open, setOpen] = useState(false);

  // Handlers to open and close the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="my-10 flex">
       
        <div className="flex-1 flex items-center max-md:hidden">
          <img className="rounded-xl shadow-xl" src={image.c1} alt="" />
        </div>

        
        <div className="flex-1 flex justify-center flex-col gap-3 pl-10 py-5 max-md:pl-0">
          <p className="capitalize text-35 font-semibold text-ldarkblue">
            Auditing & System Certification
          </p>
          <img
            className="rounded-xl hidden shadow-xl max-md:block"
            src={image.c1}
            alt=""
          />
          {/* <p className="text-justify flex flex-col gap-2 text-darkblue">
            We're building a culture at HubSpot where amazing people (like you)
            can do their best work. If you're ready to grow your career and help
            millions of organizations grow better, you've come to the right
            place.
          </p> */}
          <button className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full"  onClick={handleClickOpen}>
            <span className="text-white m-10">Read More</span>
            
          </button>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>
              <p className="font-bold text-darkblue">
                Auditing & System Certification
              </p>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            {/* Dialog Content */}
            
                <div className="  h-full overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300">

              <div className=" m-10 flex flex-col gap-4 ">
                <p className=" font-semibold text-gray-700">
                  TVE CERT provides certificates for ISO
                  9001:2015, ISO 14001:2015, ISO 45001:2018, HACCP, ISO 22000:2018,
                  ISO 27001:2022, ISO 29001:2020, CE Marking.
                </p>

                <div>
                  <h5 className="font-bold text-ldarkblue">
                    ISO 9001:2015 Quality Management System
                  </h5>
                  <p className=" indent-6 font-semibold text-gray-700">
                    A well implemented Quality Management System allows you to
                    demonstrate a predictable outcome related to your internal
                    processes and procedures. It is a key tool to allow you to
                    standardize your process to ensure consistent results every
                    time. An effective Quality Management System will enhance
                    customer satisfaction, achieve consistency, improve internal
                    processes and assist in gaining repeat business from your
                    customers.
                  </p>
                  <p className=" indent-6 font-semibold text-gray-700">
                    The internationally recognized ISO 9001 series of Standards
                    is a generic program. It is not aligned to a particular
                    product or service and is therefore very flexible. It can be
                    applied to any service or manufacturing company.
                  </p>
                  <p className=" indent-6 font-semibold text-gray-700">
                    The ISO 9001 Standard is not designed to tell you how to
                    manage your business, rather it is a tool that you can use
                    to improve consistency and efficiency within your business
                    systems and operations.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-ldarkblue">
                    How will your business benefit from certification to this
                    Standard?
                  </h5>
                  <li className="  font-semibold text-gray-700">
                    Certification to an internationally recognized third party
                    Standard such as ISO 9001 is increasingly becoming a
                    condition of contract within Industry. More and more
                    companies require suppliers to have this certification.
                  </li>
                  <li className="  font-semibold text-gray-700">
                    The ISO 9001 system can be utilized within your business to
                    improve efficiency by standardizing processes and procedures
                    saving your staff time and your business money.
                  </li>
                  <li className="font-semibold text-gray-700">
                    Management systems certification can be used as a
                    competitive advantage particularly in the tender process
                    leading to increased tender success and increased business
                    opportunities.
                  </li>
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">ISO 45001:2018 Health and Safety System</h5>
                    <p className=" indent-6 font-semibold text-gray-700">The safety management systems ISO 45001:2018 states that an occupational health and safety Management System is "that part of the overall management system which includes organisational structure, planning activities, responsibilities, practices, procedures and resources for developing, implementing, achieving, reviewing and maintaining the OHS policy and so managing the risks associated with the business of the organisation".</p>
                    <p className=" indent-6 font-semibold text-gray-700">With the endless amount of both state and federal legislation surrounding occupational health and safety, a safety management system can thoroughly assist and organisation with regulatory compliance. Via regular audits an organisation can be confident that they are meeting their health and safety obligations.</p>
                </div>

                <div>
                <h5 className="font-bold text-ldarkblue">The benefits of a safety management system</h5>
                    <p className="font-semibold text-gray-700">A good safety management system provides a business with an effective way of protecting their employees and others from injuries and illness that occur in the workplace. Other benefits include:</p>
                    <li className="font-semibold text-gray-700"><b>Due Diligence:</b> A safety system helps demonstrate that management is meeting its legal responsibilities in relation to safety legislation and regulation and is doing so effectively. </li>
                    <li className="font-semibold text-gray-700"><b>Consultation:</b> A systematic approach to processes ensures that employees and other stakeholders are involved in the business and are aware of health and safety concerns before they become much larger problems.</li>
                    <li className="font-semibold text-gray-700"><b>Performance Verification:</b> Systems can be audited and monitored to provide independent verification that health and safety performance is meeting expectations. Gaps in the processes can be quickly identified and corrected.</li>
                    <li className="font-semibold text-gray-700"><b>Cost Efficiencies:</b> A well-functioning safety management system will deliver long term cost efficiencies. Think about what your organisation can save by avoiding workplace injuries and illnesses as well as reducing any damage to property.</li>
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">ISO 14001:2015 Enivronmental Management System</h5>
                    <p className=" indent-6 font-semibold text-gray-700">The pressure to meet stringent environmental requirements placed upon companies has never been greater. As consumers move their focus towards sustainability rather than purely price, Industry must respond by decreasing its environmental impacts and improving its use of raw materials and recycling.</p>
                    <p className=" indent-6 font-semibold text-gray-700">Sound environmental management relates to identification of potential impacts, management of these issues and measurement of the success of your management programs. The internationally recognized ISO 14001 series of Standards is a good starting point to assist companies to identify the areas within their operations where they can improve their environmental performance. </p>
                    <p className=" indent-6 font-semibold text-gray-700">Sound environmental management relates to identification of potential impacts, management of these issues and measurement of the success of your management programs. The internationally recognized ISO 14001 series of Standards is a good starting point to assist companies to identify the areas within their operations where they can improve their environmental performance. </p>
                    
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">How will your business benefit from certification to this Standard?</h5>
                    <li className="font-semibold text-gray-700">Certification to an internationally recognized third party Standard such as ISO14001 is increasingly becoming a condition of contract within Industry. More and more companies require suppliers to have this certification to demonstrate strong environmental management within their operations.</li>
                    <li className="font-semibold text-gray-700">Certification to an internationally recognized third party Standard such as ISO14001 is increasingly becoming a condition of contract within Industry. More and more companies require suppliers to have this certification to demonstrate strong environmental management within their operations.</li>
                    <li className="font-semibold text-gray-700">Management systems certification can be used as a competitive advantage particularly in the tender process, leading to increased tender success and increased business opportunities. ISO 14001 is widely recognized as a minimum requirement for exporters and defense contractors.</li>
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">HACCP and ISO 22000:2018 Food Safety Management System</h5>
                    <li className="font-semibold text-gray-700">International Standards provide a reference framework, or a common technological language, between suppliers and their customers - which facilitates trade and the transfer of technology. ISO 22000:2005 is an international standard related to Food Safety Management Systems (FSMS).</li>
                    <li className="font-semibold text-gray-700">ISO 22000:2005 focuses on the total food chain – farming, processing, manufacturing, wholesale, retail food service and also on the interested parties – customers, suppliers, public authorities, etc...</li>
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">The benefits of a Food Safety Management System</h5>
                    <p className=" indent-6 font-semibold text-gray-700">FSMS is being adopted by many food chain industries to analyze, identify critical controls and establish measures to prevent potential hazards associated with a food – be it biological or physical.</p>
                    <p className=" indent-6 font-semibold text-gray-700">With emerging challenges in the food industry, many organizations are adopting food safety system on a wider basis. There also is increasing public health concern about chemical contamination of food. Another important factor is that the size of the food industry and the diversity of products and processes have grown tremendously – both domestic and imported.</p>
                    <p className=" indent-6 font-semibold text-gray-700">For food industry, adoption of FSMS is becoming imperative to reach global standards, demonstrate compliance to Regulations/Customer requirements besides providing safer food to our millions. </p>
                    <p className=" indent-6 font-semibold text-gray-700">More and more industries are adopting it as complimentary to the QMS, thereby deriving multiple benefits.</p>
                </div>

                <div>
                    <h5 className="font-bold text-ldarkblue">ISO 27001:2022 Information Security Management System</h5>
                    <p className=" indent-6 font-semibold text-gray-700">ISO/IEC 27001 aims to ensure that adequate controls addressing confidentiality, integrity and availability of information are in place to safeguard the information of interested parties. These include customers, employees, trading partners and the needs of society in general.</p>
                    <p className=" indent-6 font-semibold text-gray-700">Unprotected systems are vulnerable to all kinds of threats, such as computer-assisted fraud, sabotage and viruses. These threats can be internal or external, and both accidental or malicious. Breaches in information security can allow vital information to be accessed, stolen, corrupted or lost. How confident are you that your company has the appropriate controls and procedures in place to avoid such incidents? </p>
                    <p className=" indent-6 font-semibold text-gray-700">An information security management system compliant to ISO/IEC 27001 can help you demonstrate to trading partners and customers alike that you take information security seriously.</p>
                </div>
                <div>
                    <h5 className="font-bold text-ldarkblue">Benefits of ISO/IEC 27001</h5>
                    <li className="font-semibold text-gray-700">Commitment to information security - accredited certification to ISO/IEC 27001 is a powerful demonstration of an organisation's commitment in managing information security</li>
                    <li className="font-semibold text-gray-700">Competitive advantage - you will gain a competitive advantage as more companies require certification to ISO/IEC 27001 as a prerequisite for doing business. You will be able to make a public statement of capability without revealing your security processes, and you can minimise business risk by ensuring controls are in place to reduce the risk of security threats and to avoid system weaknesses being exploited.</li>
                </div>
                <div>
                    <h5 className="font-bold text-ldarkblue">ISO 29001:2020 Oil and Gas</h5>
                    <p className=" indent-6 font-semibold text-gray-700">ISO/TS 29001 defines the quality management system requirements for the design, development, production, installation and service of products for the petroleum, petrochemical and natural gas industries.
                    Developed as a direct result of a partnership between ISO and the international oil and gas industry (led by the American Petroleum Institute - API), ISO 29001 specifically focuses on the oil and gas supply chain.</p>
                    <p className=" indent-6 font-semibold text-gray-700">The ISO/TS 29001 standard is based on ISO 9001 and incorporates supplementary requirements emphasising defect prevention and the reduction of variation and waste from service providers.</p>
                    <p className=" indent-6 font-semibold text-gray-700">These requirements have been developed separately to ensure that they are clear and auditable. They also provide global consistency and improved assurance in the supply quality of goods and services from providers. This is particularly important when the failure of goods or services have severe ramifications for the companies and industries involved.</p>
                    <p className=" indent-6 font-semibold text-gray-700">This standard is for all organizations working within the oil and gas industry supply chain. Certification to ISO/TS 29001 ensures standardization and improvement within the sector.</p>
                    <p className="  font-semibold text-gray-700">The organizations that can use the standard are:</p>
                    <li className="font-semibold text-gray-700">Manufacturers of oil and gas industry equipment and material upstream and downstream</li>
                    <li className="font-semibold text-gray-700">Service providers to the oil and gas industry</li>
                    <li className="font-semibold text-gray-700">Purchasers of equipment, materials and services</li>
                </div>
                <div>
                    <h5 className="font-bold text-ldarkblue">Why choose TVE CERT as your certification partner?</h5>
                    <p className=" indent-6 font-semibold text-gray-700"></p>
                    
                    <li className="font-semibold text-gray-700">TVE CERT is a Global organisation with a local focus. We bring a wealth of experience gained by working around the world to your company;</li>
                    <li className="font-semibold text-gray-700">Our auditors are all trained to the highest standards and have been externally accredited;</li>
                    <li className="font-semibold text-gray-700">TVE CERT is happy to assist you to focus on issues of significance within your business rather than just auditing the documented system; and,</li>
                    <li className="font-semibold text-gray-700">We aim to develop strong, long-term relationships with our clients, a strategy which requires us to value-add at all times.</li>
                </div>
                <div>
                    
                    <p className="  text-sm text-gray-700">Contact TVE CERT today to discuss your requirements. One of our friendly staff will provide you with further information and answer any questions you may have during a confidential discussion. We are happy to provide a no obligation quotation for your review.</p>
                    
                </div>
              </div>
                </div>
            

            {/* Dialog Actions with Apply Button */}
            <div className="  p-5 border-t">
              <a
          className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600"
          href="https://forms.gle/A6YTaCtdhSrbvbtx6"
        >
          Apply
        </a>
              </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CertList1;
