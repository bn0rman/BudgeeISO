import { 
  Card, 
  CardHeader, 
  CardContent 
} from "@/components/ui/card";
import { 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Users, 
  Settings, 
  Shield
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollAnimations />
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center px-3 py-1 mb-2 rounded-full text-sm font-medium bg-black/5 border border-black/10 animate-fade-in">
              <span className="text-black/70">Our Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-4 animate-slide-up">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up stagger-1">
              Your path to ISO27001 certification in four simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps - Full Details */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            <div className="flex flex-col animate-on-scroll">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                  <span className="font-bold text-2xl">1</span>
                </div>
                <h2 className="text-2xl font-bold">Fill Out Questionnaire</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Answer questions about your business operations and context. Our intelligent system will 
                use this information to customize your documentation perfectly to your organization&apos;s 
                specific needs.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover-lift">
                <h4 className="font-bold mb-4">What We&apos;ll Ask About</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in" />
                    <div>
                      <p className="font-medium">Company size and structure</p>
                      <p className="text-sm text-muted-foreground">Details about your organization to tailor policies appropriately</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-1" />
                    <div>
                      <p className="font-medium">Technology infrastructure</p>
                      <p className="text-sm text-muted-foreground">Information about your tech stack to customize security controls</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-2" />
                    <div>
                      <p className="font-medium">Current security practices</p>
                      <p className="text-sm text-muted-foreground">Existing security measures to build upon</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-3" />
                    <div>
                      <p className="font-medium">Business objectives</p>
                      <p className="text-sm text-muted-foreground">Your goals to ensure alignment with security practices</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col animate-on-scroll stagger-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                  <span className="font-bold text-2xl">2</span>
                </div>
                <h2 className="text-2xl font-bold">Review Gaps</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Our system analyzes your responses and identifies specific areas that need 
                attention before certification. This gap analysis provides a clear roadmap 
                for what needs to be addressed.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover-lift">
                <h4 className="font-bold mb-4">Gap Analysis Process</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in" />
                    <div>
                      <p className="font-medium">Security control evaluation</p>
                      <p className="text-sm text-muted-foreground">Assessment of your current measures against ISO standards</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-1" />
                    <div>
                      <p className="font-medium">Risk assessment findings</p>
                      <p className="text-sm text-muted-foreground">Identification of key risks requiring mitigation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-2" />
                    <div>
                      <p className="font-medium">Implementation priorities</p>
                      <p className="text-sm text-muted-foreground">Clear sequence of actions to address findings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-3" />
                    <div>
                      <p className="font-medium">Action plan creation</p>
                      <p className="text-sm text-muted-foreground">Strategic roadmap for addressing all identified gaps</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col animate-on-scroll">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                  <span className="font-bold text-2xl">3</span>
                </div>
                <h2 className="text-2xl font-bold">Generate Documents</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Our system creates all necessary documentation tailored to your needs. 
                Each document is formatted professionally and follows ISO27001 best practices
                while being customized to your organization.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover-lift">
                <h4 className="font-bold mb-4">What You&apos;ll Receive</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in" />
                    <div>
                      <p className="font-medium">All required policies</p>
                      <p className="text-sm text-muted-foreground">Comprehensive set of security policies required by ISO27001</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-1" />
                    <div>
                      <p className="font-medium">Procedures documentation</p>
                      <p className="text-sm text-muted-foreground">Step-by-step procedures for implementing controls</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-2" />
                    <div>
                      <p className="font-medium">Risk register templates</p>
                      <p className="text-sm text-muted-foreground">Tools for ongoing risk management</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-3" />
                    <div>
                      <p className="font-medium">Implementation records</p>
                      <p className="text-sm text-muted-foreground">Documentation to prove implementation of controls</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col animate-on-scroll stagger-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                  <span className="font-bold text-2xl">4</span>
                </div>
                <h2 className="text-2xl font-bold">Get Certified</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Use your customized document library to successfully complete the certification
                process. Our comprehensive guidance helps you implement controls effectively and
                prepare for the audit.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover-lift">
                <h4 className="font-bold mb-4">Certification Process</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in" />
                    <div>
                      <p className="font-medium">Implementation guidance</p>
                      <p className="text-sm text-muted-foreground">Expert advice on putting controls into practice</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-1" />
                    <div>
                      <p className="font-medium">Audit preparation</p>
                      <p className="text-sm text-muted-foreground">Steps to ensure you&apos;re ready for external review</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-2" />
                    <div>
                      <p className="font-medium">Certification body selection</p>
                      <p className="text-sm text-muted-foreground">Guidance on choosing the right certification partner</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0 animate-fade-in stagger-3" />
                    <div>
                      <p className="font-medium">Ongoing compliance</p>
                      <p className="text-sm text-muted-foreground">Support for maintaining certification over time</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe in making security accessible and implementable for businesses of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 hover-lift animate-on-scroll">
              <CardHeader>
                <div className="feature-icon feature-icon-orange animate-pulse-slow">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Guided Implementation</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We don&apos;t just give you documents and leave you to figure it out. Our platform provides 
                  step-by-step guidance on how to implement each control, policy, and procedure.
                </p>
                <p className="text-muted-foreground">
                  Our approach ensures you understand not just what you need to do, but why it matters for 
                  your information security management system.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover-lift animate-on-scroll stagger-1">
              <CardHeader>
                <div className="feature-icon feature-icon-orange animate-pulse-slow">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Continuous Support</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  ISO27001 certification is not a one-time achievement but an ongoing commitment to 
                  information security. We provide continuous support to help you maintain compliance.
                </p>
                <p className="text-muted-foreground">
                  Regular updates to your documentation, surveillance audit preparation, and assistance 
                  with continual improvement are all part of our service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-10 border border-gray-100 hover-lift animate-on-scroll">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div className="inline-flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--g-color-orange)" stroke="none" className={`animate-fade-in stagger-${i}`}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xl italic mb-8 animate-fade-in stagger-1">
                &ldquo;The step-by-step approach made what seemed like an overwhelming process manageable. 
                We were able to achieve certification in just 3 months, much faster than we thought possible.&rdquo;
              </p>
              <div className="flex items-center gap-4 animate-fade-in stagger-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 transition-transform hover:scale-110"></div>
                <div className="text-left">
                  <p className="font-bold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Information Security Manager, DataSecure Ltd.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Begin your ISO27001 certification journey with our simple four-step process
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LoginLink>
                <Button size="lg" className="btn-orange h-12 px-8 text-base transition-all hover:scale-105">
                  Start Your ISO Journey
                </Button>
              </LoginLink>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base transition-all hover:scale-105" asChild>
                <Link href="/marketing/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 