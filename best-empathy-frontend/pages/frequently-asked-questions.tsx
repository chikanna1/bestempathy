import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";

const FAQsPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <div className="px-[12.5%] pt-[2%]">
        <h1>FAQs</h1>
        <div className="faqs-container">
          <div className="faq">
            <h1 className="faq-title">SHIPPING / TRACKING ORDER</h1>
            <p className="faq-text">
              All shipments are sent next day delivery via FedEx with adult
              signature required. Once your shipment has been dispatched, a
              member of the Herico Jewelry team will email your FedEx Tracking
              number and you can track your package on www.fedex.com. All
              deliveries are insured and the cost is $40.00 for all US orders.
              International shipping rates will vary and duties will apply. We
              are not able to ship to a PO Box.
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">RETURNS</h1>
            <p className="faq-text">
              For online purchases, Herico Jewelry will accept returned
              merchandise in its original condition when accompanied by the
              original packaging and sales invoice. We can either apply a 15%
              restocking fee and credit the remaining balance towards the
              original payment or extend a merchandise credit for the full
              amount less shipping towards a future purchase. You must contact
              Herico Jewelry at returns@hericojewelry.com within 3 days of
              delivery to be eligible for a return. Your order must be returned
              with all its original packaging to ensure safety while in transit.
              Returns outside of the 3 days may be accepted at the discretion of
              Herico Jewelry for merchandise credit only. Please note your
              return will go through Herico Jewelry's quality control department
              upon arrival to inspect the condition of the jewelry. We cannot
              accept jewelry that has been worn, used, altered or damaged in any
              way. Herico Jewelry has the right to reject a return if the item
              appears altered or shows signs of wear in any way. The full
              shipping return cost will be covered by the consumer. We will
              refund your credit card no later than 30 days after your return
              request, less the 15% restocking fee. Unfortunately at this time,
              we do not accept ANY RETURNS on Engagement Rings, Engraved
              Merchandise and Personalized Merchandise as these are considered
              custom order. If you are not happy with your custom order please
              email us and we will work with you so that you are fully satisfy
              with your Herico Jewelry design!
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">CURRENCY</h1>
            <p className="faq-text">
              All prices are quoted in US dollars. We only accept US currency at
              this time.
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">CONFLICT-FREE MATERIALS</h1>
            <p className="faq-text">
              All diamonds used by Herico Jewelry are ethically sourced diamonds
              in accordance with the Kimberly Process. Ethical sourcing is of
              utmost priority to Herico Jewelry. Read More
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">
              WHAT HAPPENS AFTER I SUBMIT MY ORDER VIA YOUR WEBSITE?
            </h1>
            <p className="faq-text">
              Once you submit your order, we will run your credit card and wait
              for authorization from the credit card company. After we receive
              notification that the transaction is completed, we will begin
              production on your piece. Production time is typically 4-6 weeks.
              When your new Herico Jewelry piece of jewelry is finished, we will
              email you and let you know it is complete along with a tracking
              number for your reference.
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">
              CAN I CANCEL MY ORDER ONCE IT HAS BEEN PLACED?
            </h1>
            <p className="faq-text">
              Yes, cancellations can be made within 24 hours from the time the
              order was placed. Please contact support@hericojewelry.com as soon
              as you can if you wish to cancel your order.
            </p>
          </div>
          <div className="faq">
            <h1 className="faq-title">IS MY TRANSACTION SAFE?</h1>
            <p className="faq-text">
              Yes, www.HericoJewelry.com is encrypted and PCI compliant, which
              is an information security standard for organizations that handle,
              credit card and debit card information. Defined by the Payment
              Card Industry Security Standards Council, the standard was created
              to increase controls around credit card data to reduce credit card
              fraud via its exposure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
