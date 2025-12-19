import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";


const Refund = () => {
  return (
    <>
    <Header/>
    <div className="mx-auto px-4 container py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Refund Policy</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
        <p className="text-muted-foreground mb-4">
          At Ragment, we want you to be completely satisfied with your purchase. This Refund Policy outlines the 
          terms and conditions for refunds on our subscription services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Subscription Cancellations</h2>
        <p className="text-muted-foreground mb-4">
          You may cancel your subscription at any time through your account settings. Upon cancellation:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li>Your subscription will remain active until the end of your current billing period</li>
          <li>You will not be charged for subsequent billing periods</li>
          <li>You will retain access to paid features until the end of your billing period</li>
          <li>After your subscription ends, your account will revert to the Free plan</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. Refund Eligibility</h2>
        <p className="text-muted-foreground mb-4">
          We offer refunds under the following circumstances:
        </p>
        
        <h3 className="text-lg font-medium mb-3 mt-6">New Subscriptions</h3>
        <p className="text-muted-foreground mb-4">
          If you are unhappy with your new subscription, you may request a full refund within 7 days of your initial 
          purchase. This applies to first-time subscribers only.
        </p>

        <h3 className="text-lg font-medium mb-3 mt-6">Service Unavailability</h3>
        <p className="text-muted-foreground mb-4">
          If our Service experiences significant downtime or is unavailable for an extended period (more than 24 
          consecutive hours), you may be eligible for a prorated refund for the affected period.
        </p>

        <h3 className="text-lg font-medium mb-3 mt-6">Duplicate Charges</h3>
        <p className="text-muted-foreground mb-4">
          If you were charged multiple times for the same subscription period due to a technical error, we will 
          refund the duplicate charges immediately upon verification.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Items</h2>
        <p className="text-muted-foreground mb-4">
          The following are not eligible for refunds:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li>Subscriptions that have been active for more than 7 days</li>
          <li>Renewals (as these can be avoided by canceling before the renewal date)</li>
          <li>Partial month refunds for mid-cycle cancellations</li>
          <li>Any promotional or discounted subscriptions</li>
          <li>Subscriptions terminated due to Terms of Service violations</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. How to Request a Refund</h2>
        <p className="text-muted-foreground mb-4">
          To request a refund, please follow these steps:
        </p>
        <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
          <li>Email us at <a href="mailto:billing@ragment.com" className="text-foreground underline hover:text-muted-foreground">billing@ragment.com</a> with the subject line &quot;Refund Request&quot;</li>
          <li>Include your account email address and the reason for your refund request</li>
          <li>Provide any relevant details that support your request</li>
        </ol>
        <p className="text-muted-foreground mb-4">
          We aim to respond to all refund requests within 2-3 business days.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. Refund Processing</h2>
        <p className="text-muted-foreground mb-4">
          Once your refund is approved:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li>Refunds will be processed to your original payment method</li>
          <li>Credit card refunds typically appear within 5-10 business days</li>
          <li>You will receive an email confirmation once the refund is processed</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Please note that your bank or credit card company may take additional time to post the refund to your account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Plan Downgrades</h2>
        <p className="text-muted-foreground mb-4">
          If you wish to downgrade your subscription to a lower-tier plan:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li>The change will take effect at the start of your next billing period</li>
          <li>You will retain access to your current plan&apos;s features until then</li>
          <li>No refunds are provided for the difference in plan pricing</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
        <p className="text-muted-foreground mb-4">
          We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon 
          posting the updated policy on our website. We encourage you to review this policy periodically.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about this Refund Policy or need assistance with a refund, please contact us at{" "}
          <a href="mailto:billing@ragment.com" className="text-foreground underline hover:text-muted-foreground">
            billing@ragment.com
          </a>
        </p>
      </section>
      </div>
      <Footer/>
</>
  );
};

export default Refund;
