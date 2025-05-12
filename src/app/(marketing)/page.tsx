import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ScrollAnimations from "@/components/ScrollAnimations";
import { isAuthenticated } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { 
  ArrowRight, 
  Shield, 
  FileText, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Lock, 
  Settings, 
  Zap 
} from "lucide-react";

export default async function Home() {
  // Check if user is authenticated, if so redirect to dashboard
  const authenticated = await isAuthenticated();
  if (authenticated) {
    return redirect("/dashboard");
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollAnimations />
      
      {/* Hero Section - Full width with gradient background */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-medium bg-black/5 border border-black/10 animate-fade-in">
              <span className="text-black/70">ISO27001 Made Simple</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text lg:max-w-3xl animate-slide-up">
              Generate ISO27001 Documents in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl animate-slide-up stagger-1">
              Create your complete library of ISO27001 documents customized to your 
              business, and get ready for certification faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-slide-up stagger-2">
              <Button size="lg" className="btn-orange h-12 px-8 text-base transition-all hover:scale-105" asChild>
                <Link href="/auth/signin">
                  Start Your ISO Journey
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base transition-all hover:scale-105" asChild>
                <Link href="/marketing/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Logos section */}
      <section className="w-full py-16 bg-white border-t border-b border-gray-100">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center animate-on-scroll">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
              Trusted by companies of all sizes
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70">
              {/* Replace with actual logos if available */}
              <div className="h-8 w-auto">ACME Corp</div>
              <div className="h-8 w-auto">TechFirm</div>
              <div className="h-8 w-auto">ISO Partners</div>
              <div className="h-8 w-auto">SecureTech</div>
              <div className="h-8 w-auto">GlobalSafe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Grid of cards */}
      <section className="w-full py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Perfect ISO27001 Documentation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Say goodbye to complex spreadsheets and endless hours of writing. Our platform generates complete, audit-ready documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover-lift overflow-hidden animate-on-scroll">
              <CardHeader>
                <div className="feature-icon feature-icon-orange animate-pulse-slow">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Complete Document Library</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate all required policies, procedures, and records tailored to your specific business context.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover-lift overflow-hidden animate-on-scroll stagger-1">
              <CardHeader>
                <div className="feature-icon feature-icon-orange animate-pulse-slow">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Business-Specific Content</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every document is customized to your business size, industry, and specific compliance requirements.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover-lift overflow-hidden animate-on-scroll stagger-2">
              <CardHeader>
                <div className="feature-icon feature-icon-orange animate-pulse-slow">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Audit-Ready Results</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All documentation meets the strict requirements for ISO27001 certification audits and external reviews.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-12 animate-on-scroll">
            <Button variant="ghost" className="group transition-all" asChild>
              <Link href="/marketing/features" className="flex items-center gap-2">
                View All Features
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-black text-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your ISO27001 Certification?</h2>
            <p className="text-xl opacity-80 mb-8">
              Get started today and see how Budgee ISO can streamline your certification process.
            </p>
            <Button size="lg" className="btn-orange h-12 px-8 text-base transition-all hover:scale-105" asChild>
              <Link href="/auth/signin">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 