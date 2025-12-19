
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";



const BillingSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container w-70 md:w-90 text-center md:my-20 mx-auto">
          <div 
            className="inline-flex items-center border justify-center w-20 h-20 rounded-full bg-success/10 mb-8 animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            <CheckCircle className="w-10 h-10 text-success animate-check-bounce" />
          </div>
          
          <h1 
            className="text-3xl font-bold mb-4 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Payment Successful!
          </h1>
          
          <p 
            className="text-lg text-muted-foreground mb-8 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Thank you for your subscription. Your account has been upgraded and you now have access to all premium features.
          </p>
          
          
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button asChild>
              <Link href={'/projects'}>
                <span className="flex flex-row items-center">Go to Dashboard<ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={'/'} className="text-white">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default BillingSuccess;
