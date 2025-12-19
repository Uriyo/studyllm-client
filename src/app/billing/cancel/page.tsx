
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";



const BillingCancel = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 flex items-center justify-center py-16 w-70 md:w-90 mx-auto">
        <div className="container max-w-lg text-center">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-8 animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            <XCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          
          <h1 
            className="text-3xl font-bold mb-4 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Payment Cancelled
          </h1>
          
          <p 
            className="text-lg text-muted-foreground mb-8 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Your payment was not completed. Don&apos;t worry — no charges have been made to your account.
          </p>
          
          <div 
            className="bg-muted rounded-lg p-6 mb-8 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="font-semibold mb-2">Changed your mind?</h2>
            <p className="text-sm text-muted-foreground">
              You can continue using our free plan, or return to pricing to select a plan that works for you. 
              If you experienced any issues during checkout, our support team is here to help.
            </p>
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button asChild>
              <Link href={"/#pricing"}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Pricing
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={"mailto:support@ragment.com"} className="text-white" >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
          
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default BillingCancel;
