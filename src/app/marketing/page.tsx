import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import ScrollAnimations from "@/components/ScrollAnimations";
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

export default function Home() {
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
              <LoginLink>
                <Button size="lg" className="btn-orange h-12 px-8 text-base transition-all hover:scale-105">
                  Start Your ISO Journey
                </Button>
              </LoginLink>
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

      {/* How It Works - Process Steps */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground mb-6">
                Our streamlined process takes you from questionnaire to certification with minimal effort.
              </p>
              <Button variant="ghost" className="group transition-all" asChild>
                <Link href="/marketing/how-it-works" className="flex items-center gap-2">
                  Learn How It Works
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
            </div>

            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col relative animate-on-scroll">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 z-10 transition-transform hover:scale-110">
                    <span className="font-bold">1</span>
                  </div>
                  <div className="absolute left-6 top-12 h-full w-px bg-gray-200 -z-10"></div>
                  <h3 className="font-bold text-xl mb-2">Fill Out Questionnaire</h3>
                  <p className="text-muted-foreground">
                    Answer key questions about your business operations, technology, and context.
                  </p>
                </div>
                
                <div className="flex flex-col relative animate-on-scroll stagger-1">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 z-10 transition-transform hover:scale-110">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="absolute left-6 top-12 h-full w-px bg-gray-200 -z-10"></div>
                  <h3 className="font-bold text-xl mb-2">Review Gaps</h3>
                  <p className="text-muted-foreground">
                    Identify specific areas that need attention before certification can be achieved.
                  </p>
                </div>
                
                <div className="flex flex-col relative animate-on-scroll stagger-2">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 z-10 transition-transform hover:scale-110">
                    <span className="font-bold">3</span>
                  </div>
                  <div className="absolute left-6 top-12 h-full w-px bg-gray-200 -z-10"></div>
                  <h3 className="font-bold text-xl mb-2">Generate Documents</h3>
                  <p className="text-muted-foreground">
                    Our system creates all necessary documentation precisely tailored to your needs.
                  </p>
                </div>
                
                <div className="flex flex-col animate-on-scroll stagger-3">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 transition-transform hover:scale-110">
                    <span className="font-bold">4</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">Get Certified</h3>
                  <p className="text-muted-foreground">
                    Use your customized document library to pass certification audits successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <div className="mb-6">
              <div className="inline-flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--g-color-orange)" stroke="none" className={`animate-fade-in stagger-${i}`}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-2xl italic mb-8 animate-fade-in stagger-1">
              &ldquo;Budgee ISO saved us months of work. We were able to prepare all our documentation 
              for ISO27001 in just two weeks, and passed our audit with flying colors.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-in stagger-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 transition-transform hover:scale-110"></div>
              <div className="text-left">
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">CTO, TechSolutions Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Choose the plan that&apos;s right for your business size and certification needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border border-gray-200 hover-lift animate-on-scroll">
              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold">Starter</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold">$999</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Perfect for small businesses getting started with ISO27001
                </p>
                <ul className="space-y-2 mb-6">
                  {['All essential policies', 'Basic risk assessment', 'Email support'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full transition-all hover:bg-gray-100" asChild>
                  <Link href="/marketing/pricing">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-black relative hover-lift animate-on-scroll stagger-1">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-slow">
                <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold">Professional</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold">$1,999</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Comprehensive solution for medium-sized businesses
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Complete policy library', 
                    'Risk assessment templates', 
                    'Implementation guidance',
                    'Priority support'
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full btn-orange transition-all hover:scale-105">
                  <Link href="/marketing/pricing">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover-lift animate-on-scroll stagger-2">
              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="text-muted-foreground ml-2">pricing</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Tailored solution for larger organizations with complex needs
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Fully customized solution', 
                    'Dedicated account manager', 
                    'On-demand consultations',
                    'Enterprise-grade support'
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full transition-all hover:bg-gray-100" asChild>
                  <Link href="/marketing/pricing">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-black text-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your ISO27001 Journey?</h2>
              <p className="text-gray-300 mb-8">
                Get started today and see how Budgee ISO can streamline your certification process.
              </p>
              <LoginLink>
                <Button size="lg" className="btn-orange h-12 px-8 text-base transition-all hover:scale-105">
                  Start Your Free Trial
                </Button>
              </LoginLink>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="flex flex-col items-center animate-on-scroll">
                <div className="text-4xl font-bold text-white mb-2 animate-slide-up">4x</div>
                <p className="text-gray-300 text-center">Faster certification<br />process</p>
              </div>
              <div className="flex flex-col items-center animate-on-scroll stagger-1">
                <div className="text-4xl font-bold text-white mb-2 animate-slide-up">100%</div>
                <p className="text-gray-300 text-center">Audit pass<br />rate</p>
              </div>
              <div className="flex flex-col items-center animate-on-scroll stagger-2">
                <div className="text-4xl font-bold text-white mb-2 animate-slide-up">$10k+</div>
                <p className="text-gray-300 text-center">Average savings<br />vs consulting</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
