import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";


const Terms = () => {
  return (
<>
    <Header/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-10">Terms of Service</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing or using Ragment (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
          If you disagree with any part of the terms, you may not access the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p className="text-muted-foreground mb-4">
          Ragment is an AI-powered knowledge assistant that helps users with research, learning, and discovery. 
          The Service allows users to upload content and receive AI-generated insights, summaries, study guides, and more.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="text-muted-foreground mb-4">
          When you create an account with us, you must provide accurate, complete, and current information. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
        </p>
        <p className="text-muted-foreground mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities 
          or actions under your password. You agree not to disclose your password to any third party.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Subscriptions and Payments</h2>
        <p className="text-muted-foreground mb-4">
          Some parts of the Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in 
          advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set on a monthly basis.
        </p>
        <p className="text-muted-foreground mb-4">
          A valid payment method, including credit card, is required to process the payment for your Subscription. 
          You shall provide accurate and complete billing information. By submitting such payment information, you 
          automatically authorize us to charge all Subscription fees incurred through your account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Free Trial</h2>
        <p className="text-muted-foreground mb-4">
          We may, at our sole discretion, offer a Subscription with a free trial for a limited period of time. 
          You may be required to enter your billing information in order to sign up for the free trial.
        </p>
        <p className="text-muted-foreground mb-4">
          If you do not cancel your Subscription before the end of the free trial period, you will be automatically 
          charged the applicable Subscription fee for the type of Subscription you have selected.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. Content</h2>
        <p className="text-muted-foreground mb-4">
          Our Service allows you to upload, store, and process content. You are responsible for the content that 
          you upload, including its legality, reliability, and appropriateness.
        </p>
        <p className="text-muted-foreground mb-4">
          You retain all of your ownership rights in your content. By uploading content to the Service, you grant 
          us a limited license to use, process, and store your content solely for the purpose of providing the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Prohibited Uses</h2>
        <p className="text-muted-foreground mb-4">
          You agree not to use the Service:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
          <li>To violate any international, federal, or state regulations, rules, or laws</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
          <li>To upload or transmit viruses or any other type of malicious code</li>
          <li>To spam, phish, or conduct any other fraudulent activity</li>
          <li>To interfere with or circumvent the security features of the Service</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
        <p className="text-muted-foreground mb-4">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
          whatsoever, including without limitation if you breach the Terms.
        </p>
        <p className="text-muted-foreground mb-4">
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your 
          account, you may simply discontinue using the Service or contact us to request account deletion.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">
          In no event shall Ragment, nor its directors, employees, partners, agents, suppliers, or affiliates, 
          be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access 
          to or use of or inability to access or use the Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p className="text-muted-foreground mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
          is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
        </p>
        <p className="text-muted-foreground mb-4">
          By continuing to access or use our Service after those revisions become effective, you agree to be bound 
          by the revised terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@ragment.com" className="text-foreground underline hover:text-muted-foreground">
            support@ragment.com
          </a>
        </p>
      </section>
      </div>
      <Footer/>
</>
  );
};

export default Terms;
