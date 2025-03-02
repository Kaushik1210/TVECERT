import React, { useState, useRef } from "react";

import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import CloseIcon from "@mui/icons-material/Close";



import image from "../Assets/dummy";

import {
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Policy1 from "./Policy1";
import Policy2 from "./Policy2";
import Policy3 from "./Policy3";

const Footer = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

  const [anchorElPayment, setAnchorElPayment] = useState(null);

  const handleSmoothScroll = (event, href) => {
    event.preventDefault();
    const targetElement = document.getElementById(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent("");
  };

  const handlePaymentClick = (event) => {
    setAnchorElPayment(event.currentTarget);
  };

  const handlePaymentClose = () => {
    setAnchorElPayment(null);
  };

  const handlePolicyClick = (policy) => {
    let content = "";
    let title = "";
    if (policy === "Refund Policy") {
      content = (
        // <div className="  flex flex-col gap-2 list-none  text-darkblue">
        //   <ul class="list-none space-y-1">
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       TVE CERTIFICATION SERVICES PRIVATE LIMITED believes in helping its
        //       customers as far as possible, and has therefore a liberal
        //       cancellation policy. Under this policy: Cancellations will be
        //       considered only if the request is made within 7 days of placing
        //       the order. However, the cancellation request may not be
        //       entertained if the orders have been communicated to the
        //       vendors/merchants and they have initiated the process of shipping
        //       them.
        //     </li>
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       TVE CERTIFICATION SERVICES PRIVATE LIMITED does not accept
        //       cancellation requests for perishable items like flowers, eatables
        //       etc. However, refund/replacement can be made if the customer
        //       establishes that the quality of product delivered is not good.
        //     </li>
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       In case of receipt of damaged or defective items please report the
        //       same to our Customer Service team. The request will, however, be
        //       entertained once the merchant has checked and determined the same
        //       at his own end. This should be reported within 7 days of receipt
        //       of the products.
        //     </li>
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       In case you feel that the product received is not as shown on the
        //       site or as per your expectations, you must bring it to the notice
        //       of our customer service within 7 days of receiving the product.
        //       The Customer Service Team after looking into your complaint will
        //       take an appropriate decision.
        //     </li>
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       In case of complaints regarding products that come with a warranty
        //       from manufacturers, please refer the issue to them.
        //     </li>
        //     <li class="flex items-start">
        //       <span class="before:content-['•'] before:mr-1 before:text-black"></span>
        //       In case of any Refunds approved by the TVE CERTIFICATION SERVICES
        //       PRIVATE LIMITED, it’ll take 9-15 days for the refund to be
        //       processed to the end customer.
        //     </li>
        //   </ul>
        // </div>
        <Policy1/>
      );
      title = "Refund Policy";
    } else if (policy === "Privacy Policy") {
      content = (
        // <div className=" flex flex-col gap-4">
        //   <div>
        //     <p className=" indent-3">
        //       TVE CERT Privacy Policy TVE Certification Services Pvt. Ltd., and
        //       TVE International Academy Pvt. Ltd., with www.tvecert.org website,
        //       which operates as Training and Certification Body.
        //     </p>
        //     <p className=" indent-3">
        //       This page is used to inform website visitors regarding our
        //       policies with the collection, use, and disclosure of Personal
        //       Information if anyone decided to use our Service.
        //     </p>
        //     <p className=" indent-3">
        //       If you choose to use our Service, then you agree to the collection
        //       and use of information in relation with this policy. The Personal
        //       Information that we collect are used for providing and improving
        //       the Service. We will not use or share your information with anyone
        //       except as described in this Privacy Policy.
        //     </p>
        //     <p className=" indent-3">
        //       The terms used in this Privacy Policy have the same meanings as in
        //       our Terms and Conditions, which is accessible at, unless otherwise
        //       defined in this Privacy Policy.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Information Collection and Use</b>
        //     <p className=" indent-3">
        //       For a better experience while using our Service, we may require
        //       you to provide us with certain personally identifiable
        //       information, including but not limited to your name, phone number,
        //       and postal address. The information that we collect will be used
        //       to contact or identify you.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Log Data</b>
        //     <p className=" indent-3">
        //       We want to inform you that whenever you visit our Service, we
        //       collect information that your browser sends to us that is called
        //       Log Data. This Log Data may include information such as your
        //       computer's Internet Protocol ("IP") address, browser version,
        //       pages of our Service that you visit, the time and date of your
        //       visit, the time spent on those pages, and other statistics.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Cookies</b>
        //     <p className=" indent-3">
        //       Cookies are files with small amount of data that is commonly used
        //       an anonymous unique identifier. These are sent to your browser
        //       from the website that you visit and are stored on your computer's
        //       hard drive.
        //     </p>
        //     <p className=" indent-3">
        //       Our website uses these "cookies" to collection information and to
        //       improve our Service. You have the option to either accept or
        //       refuse these cookies, and know when a cookie is being sent to your
        //       computer. If you choose to refuse our cookies, you may not be able
        //       to use some portions of our Service.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Service Providers</b>
        //     <p className=" indent-3">
        //       We may employ third-party companies and individuals due to the
        //       following reasons:
        //     </p>
        //     <li>To facilitate our Service</li>
        //     <li>To provide the Service on our behalf</li>
        //     <li>To perform Service-related services or</li>
        //     <li> To assist us in analyzing how our Service is used.</li>
        //     <p className=" indent-3">
        //       We want to inform our Service users that these third parties have
        //       access to your Personal Information. The reason is to perform the
        //       tasks assigned to them on our behalf. However, they are obligated
        //       not to disclose or use the information for any other purpose.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Security</b>
        //     <p className=" indent-3">
        //       We value your trust in providing us your Personal Information,
        //       thus we are striving to use commercially acceptable means of
        //       protecting it. But remember that no method of transmission over
        //       the internet, or method of electronic storage is 100% secure and
        //       reliable, and we cannot guarantee its absolute security.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Links to Other Sites</b>
        //     <p className=" indent-3">
        //       Our Service may contain links to other sites. If you click on a
        //       third-party link, you will be directed to that site.
        //     </p>

        //     <p className=" indent-3">
        //       Note that these external sites are not operated by us. Therefore,
        //       we strongly advise you to review the Privacy Policy of these
        //       websites. We have no control over, and assume no responsibility
        //       for the content, privacy policies, or practices of any third-party
        //       sites or services.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Children's Privacy</b>
        //     <p className=" indent-3">
        //       Our Services do not address anyone under the age of 18. We do not
        //       knowingly collect personal identifiable information from children
        //       under 18. In the case we discover that a child under 18 has
        //       provided us with personal information, we immediately delete this
        //       from our servers. If you are a parent or guardian and you are
        //       aware that your child has provided us with personal information,
        //       please contact us so that we will be able to do necessary actions.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Changes to This Privacy Policy</b>
        //     <p className=" indent-3">
        //       We may update our Privacy Policy from time to time. Thus, we
        //       advise you to review this page periodically for any changes. We
        //       will notify you of any changes by posting the new Privacy Policy
        //       on this page. These changes are effective immediately, after they
        //       are posted on this page.
        //     </p>
        //   </div>

        //   <div>
        //     <b>Contact Us</b>
        //     <p className=" indent-3">
        //       If you have any questions or suggestions about our Privacy Policy,
        //       do not hesitate to contact us at <b>+91 9345101472.</b>
        //       This Privacy Policy page was created at <b>www.tvecert.org </b>
        //     </p>
        //   </div>
        // </div>
        <Policy2/>
      );
      title = "Privacy Policy";
    } else if (policy === "Terms & Conditions") {
      content = (
        // <div className=" flex flex-col gap-3">
        //   <b>Terms and conditions of use</b>
        //   <b>Introduction</b>
        //   <div>
        //     <b>
        //       <b>1.</b>These terms and conditions shall govern your
        //       use of our website.
        //     </b>
        //     <p>
        //       <b>1.1.</b>By using our website, you accept these terms and
        //       conditions in full; accordingly, if you disagree with these terms
        //       and conditions or any part of these terms and conditions, you must
        //       not use our website.
        //     </p>
        //     <p>
        //       <b>1.2.</b>If you [register with our website, submit any material
        //       to our website or use any of our website services], we will ask
        //       you to expressly agree to these terms and conditions.
        //     </p>
        //     <p>
        //       <b>1.3.</b>You must be at least [18] years of age to use our
        //       website; by using our website or agreeing to these terms and
        //       conditions, you warrant and represent to us that you are at least
        //       [18] years of age.
        //     </p>
        //     <p>
        //       <b>1.4.</b>Our website uses cookies; by using our website or
        //       agreeing to these terms and conditions, you consent to our use of
        //       cookies in accordance with the terms of our [privacy and
        //       cookies policy].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>2.</b>Licence to use website
        //     </b>
        //     <p>
        //       <b>2.1.</b>You may:
        //     </p>
        //     <p>
        //       <b>(a)</b>view pages from our website in a web browser;
        //     </p>
        //     <p>
        //       <b>(b)</b>download pages from our website for caching in a web
        //       browser;
        //     </p>
        //     <p>
        //       <b>(c)</b>print pages from our website;
        //     </p>
        //     <p>
        //       subject to the other provisions of these terms and conditions.
        //     </p>
        //     <p>
        //       <b>2.2.</b>Except as expressly permitted BY THE provisions of
        //       these terms and conditions, you must not download any material
        //       from our website or save any such material to your computer.
        //     </p>
        //     <p>
        //       <b>2.3.</b>You may only use our website for [your own personal and
        //       business purposes, and you must not use our website for
        //       any other purposes.
        //     </p>
        //     <p>
        //       <b>2.4.</b>Except as expressly permitted by these terms and
        //       conditions, you must not edit or otherwise modify any
        //       material on our website.
        //     </p>

        //     <p>
        //       <b>2.5.</b>Unless you own or control the relevant rights in the
        //       material, you must not:
        //     </p>
        //     <p>
        //       <b>(a)</b> republish material from our website (including
        //       republication on another website);
        //     </p>
        //     <p>
        //       <b>(b)</b>sell, rent or sub-license material from our website;
        //     </p>
        //     <p>
        //       <b>(c)</b>show any material from our website in public;
        //     </p>
        //     <p>
        //       <b>(d)</b>show any material from our website in public;
        //     </p>
        //     <p>
        //       <b>(e)</b>exploit material from our website for a commercial
        //       purpose; or
        //     </p>
        //     <p>
        //       <b>2.6.</b>We reserve the right to restrict access to areas of our
        //       website, or indeed our whole website, at our discretion; you must
        //       not circumvent or bypass, or attempt to circumvent or bypass, any
        //       access restriction measures on our website.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>3.</b>Acceptable use
        //     </b>
        //     <p>
        //       <b>3.1.</b>Acceptable use{" "}
        //     </p>
        //     <p>
        //       <b>(a)</b>use our website in any way or take any action that
        //       causes, or may cause, damage to the website or impairment of the
        //       performance, availability or accessibility of the website;
        //     </p>
        //     <p>
        //       <b>(b)</b>use our website in any way that is unlawful, illegal,
        //       fraudulent or harmful, or in connection with any unlawful,
        //       illegal, fraudulent or harmful purpose or activity;
        //     </p>
        //     <p>
        //       <b>(c)</b>use our website to copy, store, host, transmit, send,
        //       use, publish or distribute any material which consists of (or is
        //       linked to) any spyware, computer virus, Trojan horse, worm,
        //       keystroke logger, rootkit or other malicious computer software;
        //     </p>
        //     <p>
        //       <b>(d)</b> [conduct any systematic or automated data collection
        //       activities (including without limitation scraping, data mining,
        //       data extraction and data harvesting) on or in relation to our
        //       website without our express written consent];
        //     </p>
        //     <p>
        //       <b>(e)</b>[access or otherwise interact with our website using any
        //       robot, spider or other automated means, except for the purpose of
        //       [search engine indexing]];
        //     </p>
        //     <p>
        //       <b>(f)</b>[violate the directives set out in the robots.txt file
        //       for our website]; or
        //     </p>
        //     <p>
        //       <b>(g)</b>[use data collected from our website for any direct
        //       marketing activity (including without limitation email marketing,
        //       SMS marketing, telemarketing and direct mailing)].
        //     </p>
        //     <p>
        //       <b>3.2.</b> You must not use data collected from our website to
        //       contact individuals, companies or other persons or entities.
        //     </p>
        //     <p>
        //       <b>3.3.</b>You must ensure that all the information you supply to
        //       us through our website, or in relation to our website, is [true,
        //       accurate, current, complete and non-misleading].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>4.</b>Registration and accounts
        //     </b>
        //     <p>
        //       <b>4.1.</b>You may register for an account with our website by
        //       [completing and submitting the account registration form on our
        //       website, and clicking on the verification link in the email that
        //       the website will send to you].
        //     </p>
        //     <p>
        //       <b>4.2.</b>You must not allow any other person to use your account
        //       to access the website.
        //     </p>
        //     <p>
        //       <b>4.3.</b>You must notify us in writing immediately if you become
        //       aware of any unauthorised use of your account.
        //     </p>
        //     <p>
        //       <b>4.4.</b>You must not use any other person's account to access
        //       the website[, unless you have that person's express
        //       permission to do so].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>5.</b>User login details
        //     </b>
        //     <p>
        //       <b>5.1.</b>If you register for an account with our website, [we
        //       will provide you with] OR [you will be asked to choose] [a user ID
        //       and password].
        //     </p>
        //     <p>
        //       <b>5.2.</b>Your user ID must not be liable to mislead; you must
        //       not use your account or user ID for or in connection with the
        //       impersonation of any person.
        //     </p>
        //     <p>
        //       <b>5.3.</b>You must keep your password confidential.
        //     </p>
        //     <p>
        //       <b>5.4.</b>You must notify us in writing immediately if you become
        //       aware of any disclosure of your password.
        //     </p>
        //     <p>
        //       <b>5.5.</b>You are responsible for any activity on our website
        //       arising out of any failure to keep your password confidential, and
        //       may be held liable for any losses arising out of such a failure.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>6.</b>Cancellation and suspension of account
        //     </b>
        //     <p>
        //       <b>6.1.</b>We may:
        //     </p>
        //     <p>
        //       <b>(a)</b>[suspend your account];
        //     </p>
        //     <p>
        //       <b>(b)</b>[cancel your account]; and/or
        //     </p>
        //     <p>
        //       <b>(c)</b>[edit your account details], at any time in our sole
        //       discretion without notice or explanation.
        //     </p>
        //     <p>
        //       <b>6.2.</b>You may cancel your account on our website [using your
        //       account control panel on the website].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       7.<b></b>Your content: licence
        //     </b>
        //     <p>
        //       <b>7.1.</b>In these terms and conditions, "your content" means all
        //       works and materials (including without limitation text, graphics,
        //       images, audio material, video material, audio-visual material,
        //       scripts, software and files) that you submit to us or our website
        //       for storage or publication on, processing by, or transmission via,
        //       our website.
        //     </p>
        //     <p>
        //       <b>7.2.</b>You grant to us a [worldwide, irrevocable,
        //       non-exclusive, royalty-free licence] to [use, reproduce, store,
        //       adapt, publish, translate and distribute your content in any
        //       existing or future media] OR [reproduce, store and publish your
        //       content on and in relation to this website and any successor
        //       website] OR [reproduce, store and, with your specific consent,
        //       publish your content on and in relation to this website].
        //     </p>
        //     <p>
        //       <b>7.3.</b>You hereby waive all your moral rights in your content
        //       to the maximum extent permitted by applicable law; and you warrant
        //       and represent that all other moral rights in your content have
        //       been waived to the maximum extent permitted by applicable law.
        //     </p>
        //     <p>
        //       <b>7.4.</b> You may edit your content to the extent permitted
        //       using the editing functionality made available on our website.
        //     </p>
        //     <p>
        //       <b>7.5.</b>Without prejudice to our other rights under these terms
        //       and conditions, if you breach any provision of these terms and
        //       conditions in any way, or if we reasonably suspect that you have
        //       breached these terms and conditions in any way, we may delete,
        //       unpublish or edit any or all of your content.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>8.</b>Your content: rules
        //     </b>
        //     <p>
        //       <b>8.1.</b>You warrant and represent that your content will comply
        //       with these terms and conditions.
        //     </p>
        //     <p>
        //       <b>8.2.</b>Your content must not be illegal or unlawful, must not
        //       infringe any person's legal rights, and must not be capable of
        //       giving rise to legal action against any person (in each case in
        //       any jurisdiction and under any applicable law).
        //     </p>
        //     <p>
        //       <b>8.3.</b>Your content, and the use of your content by us in
        //       accordance with these terms and conditions, must not:
        //     </p>
        //     <p>
        //       <b>(a)</b>be libellous or maliciously false;
        //     </p>
        //     <p>
        //       <b>(b)</b>be obscene or indecent;
        //     </p>
        //     <p>
        //       <b>(c)</b>infringe any copyright, moral right, database right,
        //       trade mark right, design right, right in passing off, or other
        //       intellectual property right;
        //     </p>
        //     <p>
        //       <b>(d)</b>infringe any right of confidence, right of privacy or
        //       right under data protection legislation;
        //     </p>
        //     <p>
        //       <b>(e)</b>constitute negligent advice or contain any negligent
        //       statement;
        //     </p>
        //     <p>
        //       <b>(f)</b>constitute an incitement to commit a crimel,
        //       instructions for the commission of a crime or the promotion of
        //       criminal activity];
        //     </p>
        //     <p>
        //       <b>(g)</b>be in contempt of any court, or in breach of any court
        //       order;
        //     </p>
        //     <p>
        //       <b>(h)</b>be in breach of racial or religious hatred or
        //       discrimination legislation;
        //     </p>
        //     <p>
        //       <b>(i)</b>be blasphemous;
        //     </p>
        //     <p>
        //       <b>(j)</b>be in breach of official secrets legislation;
        //     </p>
        //     <p>
        //       <b>(k)</b> be in breach of any contractual obligation owed to any
        //       person;
        //     </p>
        //     <p>
        //       <b>(l)</b>[depict violencel in an explicit, graphic or gratuitous
        //       manner]l;
        //     </p>
        //     <p>
        //       <b>(m)</b>[be pornographic, lewd, suggestive or sexually
        //       explicit]];
        //     </p>
        //     <p>
        //       <b>(n)</b>[be untrue, false, inaccurate or misleading];
        //     </p>
        //     <p>
        //       <b>(o)</b>[consist of or contain any instructions, advice or other
        //       information which may be acted upon and could, if acted upon,
        //       cause illness, injury or death, or any other loss or damage];
        //     </p>
        //     <p>
        //       <b>(p)</b>[constitute spam];
        //     </p>
        //     <p>
        //       <b>(q)</b>[be offensive, deceptive, fraudulent, threatening,
        //       abusive, harassing, anti-social, menacing, hateful, discriminatory
        //       or inflammatory]; or
        //     </p>
        //     <p>
        //       <b>(r)</b> [cause annoyance, inconvenience or needless
        //       anxiety to any person].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>9.</b>Limited warranties
        //     </b>
        //     <p>
        //       <b>9.1.</b>We do not warrant or represent:
        //     </p>
        //     <p>
        //       <b>(a)</b>the completeness or accuracy of the information
        //       published on our website;
        //     </p>
        //     <p>
        //       <b>(b)</b>that the material on the website is up to date; or
        //     </p>
        //     <p>
        //       <b>(c)</b>that the website or any service on the website will
        //       remain available.
        //     </p>
        //     <p>
        //       <b>9.2.</b> We reserve the right to discontinue or alter any or
        //       all of our website services, and to stop publishing our website,
        //       at any time in our sole discretion without notice or explanation;
        //       and save to the extent expressly provided otherwise in these terms
        //       and conditions, you will not be entitled to any compensation or
        //       other payment upon the discontinuance or alteration of any website
        //       services, or if we stop publishing the website.
        //     </p>
        //     <p>
        //       <b>9.3.</b>To the maximum extent permitted by applicable law, we
        //       exclude all representations and warranties relating to the subject
        //       matter of these terms and conditions, our website and the
        //       use of our website.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>10.</b>Breaches of these terms and conditions
        //     </b>
        //     <p>
        //       10.1.<b></b>Without prejudice to our other rights under these
        //       terms and conditions, if you breach these terms and conditions in
        //       any way, or if we reasonably suspect that you have breached these
        //       terms and conditions in any way, we may:
        //     </p>
        //     <p>
        //       <b>(a)</b>send you one or more formal warnings;
        //     </p>
        //     <p>
        //       <b>(b)</b>temporarily suspend your access to our website;
        //     </p>
        //     <p>
        //       <b>(c)</b>permanently prohibit you from accessing our website;
        //     </p>
        //     <p>
        //       <b>(d)</b>[block computers using your IP address from accessing
        //       our website];
        //     </p>
        //     <p>
        //       <b>(e)</b>[contact any or all of your internet service providers
        //       and request that they block your access to our website];
        //     </p>
        //     <p>
        //       <b>(f)</b>commence legal action against you, whether for breach of
        //       contract or otherwise; and/or
        //     </p>
        //     <p>
        //       <b>(g)</b>[suspend or delete your account on our website].{" "}
        //     </p>
        //     <p>
        //       <b>10.2.</b>Where we suspend or prohibit or block your access to
        //       our website or a part of our website, you must not take any action
        //       to circumvent such suspension or prohibition or blocking including
        //       without limitation [creating and/or using a different account].
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>11.</b>Variation
        //     </b>
        //     <p>
        //       <b>11.1.</b>We may revise these terms and conditions from time to
        //       time.
        //     </p>
        //     <p>
        //       <b>11.2.</b>[The revised terms and conditions shall apply to the
        //       use of our website from the date of publication of the revised
        //       terms and conditions on the website, and you hereby waive any
        //       right you may otherwise have to be notified of, or to consent to,
        //       revisions of these terms and conditions.] OR [We will give you
        //       written notice of any revision of these terms and conditions, and
        //       the revised terms and conditions will apply to the use of our
        //       website from the date that we give you such notice; if you do not
        //       agree to the revised terms and conditions, you must stop using our
        //       website.]
        //     </p>
        //     <p>
        //       <b>11.3.</b> If you have given your express agreement to these
        //       terms and conditions, we will ask for your express agreement to
        //       any revision of these terms and conditions; and if you do not give
        //       your express agreement to the revised terms and conditions within
        //       such period as we may specify, we will disable or delete your
        //       account on the website, and you must stop using the website.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>12.</b>Assignment
        //     </b>
        //     <p>
        //       <b>12.1.</b>You hereby agree that we may assign, transfer,
        //       sub-contract or otherwise deal with our rights and/or obligations
        //       under these terms and conditions.
        //     </p>
        //     <p>
        //       <b>12.2.</b> You may not without our prior written consent assign,
        //       transfer, subcontract or otherwise deal with any of your rights
        //       and/or obligations under these terms and conditions.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>13.</b>Severability
        //     </b>
        //     <p>
        //       <b>13.1.</b>If a provision of these terms and conditions is
        //       determined by any court or other competent authority to be
        //       unlawful and/or unenforceable, the other provisions will continue
        //       in effect.
        //     </p>
        //     <p>
        //       <b>13.2.</b>If any unlawful and/or unenforceable provision of
        //       these terms and conditions would be lawful or enforceable if part
        //       of it were deleted, that part will be deemed to be deleted, and
        //       the rest of the provision will continue in effect.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>14.</b>Third party rights
        //     </b>
        //     <p>
        //       <b>14.1.</b>A contract under these terms and conditions is for our
        //       benefit and your benefit, and is not intended to benefit or be
        //       enforceable by any third party.
        //     </p>
        //     <p>
        //       <b>14.2.</b>The exercise of the parties' rights under a contract
        //       under these terms and conditions is not subject to the consent of
        //       any third party.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>Entire agreement</b>
        //     </b>
        //     <p>
        //       <b>15.1.</b>The terms and conditions, together with [our privacy
        //       and cookies policy], shall constitute the entire agreement between
        //       you and us in relation to your use of our website and shall
        //       supersede all previous agreements between you and us in relation
        //       to your use of our website.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>16.</b>Law and jurisdiction
        //     </b>
        //     <p>
        //       <b>16.1.</b>These terms and conditions shall be governed by and
        //       construed in accordance with Indian Law.
        //     </p>
        //     <p>
        //       <b>16.3.</b>Any disputes relating to these terms and conditions
        //       shall be subject to the [exclusive] OR [non-exclusive]
        //       jurisdiction of the courts of India.
        //     </p>
        //   </div>

        //   <div>
        //     <b>
        //       <b>17.</b>Our details.
        //     </b>
        //     <p>
        //       <b>17.1.</b>This website is owned and operated by Shalom Infotech.
        //     </p>
        //     <p>
        //       <b>17.2.</b>Our principal place of business is at Trichy, Tamil
        //       Nadu.
        //     </p>
        //     <p>
        //       <b>17.3.</b>You can contact us:
        //     </p>
        //   </div>

        //   <div className=" flex-col flex">
        //     <p>TVE Certification Services Pvt. Ltd.</p>
        //     <p>TVE International Academy Pvt.</p>
        //     <p>Ltd., 21/26 B, Kamarajar Street,</p>
        //     <p>K.K. Nagar, Trichy - 620 021, Tamil</p>
        //     <p>Nadu, India.</p>
        //     <b>+91 93607 28434 </b>
        //     <b>0431 - 4051364</b>
        //   </div>
        // </div>
        <Policy3/>
      );

      title = "Terms & Conditions";
    }
    setModalContent(content);
    setModalTitle(title);
    setOpenModal(true);
  };

  return (
    <footer
      id="contactus"
      className="flex flex-col bg-darkblue text-lwhite px-100 py-50 gap-14
                max-lg:px-20 max-[950px]:px-14 max-sm:px-4"
    >
      {/* Logo and Social Icons */}
      <div className="flex items-center justify-between">
        <div>
          <img
            className="w-[80px] bg-white rounded-lg"
            src={image.tvecertLogo}
            alt="TVE Cert Logo"
          />
        </div>
        <div className="flex gap-8 text-24 z-10">
          <a
            href="https://www.linkedin.com/in/baskaran-venkataramanujam-09370033/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://www.facebook.com/people/TVE-Certification-Services-Pvt-Ltd/100064146185361/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/tve_cert/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>

      {/* About Text */}
      <div>
        <p className="font-light">
        TVE Certification Services is a well renowned Certification Body to provide the Certification Services. <br />TVE International Academy is the globally recognised Training Body in delivering various professional Trainings.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex font-light max-[700px]:flex-col max-[700px]:gap-8">
        <div className="flex flex-1 max-[950px]:flex-col max-[950px]:gap-8">
          <div className="flex flex-1 gap-3 items-center">
            <MdOutlineMailOutline className="text-18" />
            <p>info@tvecert.org</p>
          </div>

          <div className="flex flex-1 gap-3 items-center">
            <FaPhone className="text-18" />
            <p>+91-9361444418</p>
          </div>
        </div>

        <div className="flex flex-1 max-[950px]:flex-col max-[950px]:gap-8">
          <div className="flex flex-1 gap-3 items-center">
            <GiRotaryPhone className="text-18" />
            <p>0431-4051364</p>
          </div>

          <div className="flex flex-1 gap-3 items-center">
            <FaMapMarkedAlt className="text-18" />
            <p>
              Plot No.5, Ganapathy Nagar,
              <br />
              K.K. Nagar, Trichy - 620021,
              <br />
              Tamil Nadu, India.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex max-[950px]:flex-col max-[950px]:gap-12">
        <div className="flex-1 flex max-[700px]:flex-col max-[700px]:gap-12">
          <div className="flex-1 gap-3 flex flex-col">
            <a
              onClick={(event) => handleSmoothScroll(event, "home")}
              className="hover:underline text-gray-300 hover:text-white"
            >
              Home
            </a>
          </div>

          <div className="flex-1 gap-3 flex flex-col">
            <Link
              to="/training"
              className="hover:underline text-gray-300 hover:text-white"
            >
              Training
            </Link>
          </div>
        </div>

        <div className="flex-1 flex max-[700px]:flex-col max-[700px]:gap-12">
          <div className="flex-1 gap-3 flex flex-col">
            <Link
              to="/certification"
              className="hover:underline text-gray-300 hover:text-white"
            >
              Certification
            </Link>
          </div>

          <div className="flex-1 gap-3 flex flex-col">
          <div>
            <button
              className="text-16 flex text-gray-300 hover:text-white items-center hover:underline cursor-pointer"
              onClick={handlePaymentClick}
            >
              Online Payment
              <IoIosArrowDown />
            </button>
            <Menu
              anchorEl={anchorElPayment}
              open={Boolean(anchorElPayment)}
              onClose={handlePaymentClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handlePolicyClick("Refund Policy")}>
                Refund Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Privacy Policy")}>
                Privacy Policy
              </MenuItem>
              <MenuItem onClick={() => handlePolicyClick("Terms & Conditions")}>
                Terms & Conditions
              </MenuItem>
            </Menu>
          </div>
          <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div className="flex justify-between">
            <p className="font-bold text-darkblue">{modalTitle}</p>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                // position: "absolute",
                // right: 8,
                // top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>

        {/* Dialog Content */}

        <div
          className="  h-full  overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
        >
          <div
            className="m-5  overflow-scroll 
      rounded-r-md [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            {modalContent}
          </div>
        </div>
      </Dialog>
          </div>

        </div>
      </div>
          
          <div className="flex-1 flex max-[700px]:flex-col max-[700px]:gap-12">
          <div className="flex-1 gap-3 flex flex-col">
            <Link
              to="/certification#certificateinfo"
              className="hover:underline text-gray-300 hover:text-white"
            >
              Certification Info
            </Link>
          </div>

          <div className="flex-1 gap-3 flex flex-col">
            {/* <a href="" className="hover:underline text-gray-300 hover:text-gray-300">
              Online Payment
            </a> */}
            <Link
              to="/training#delegateinfo"
              className="hover:underline text-gray-300 hover:text-white"
            >
              Delegate Certificate Info
            </Link>
          </div>

        </div>
    </footer>
  );
};

export default Footer;
