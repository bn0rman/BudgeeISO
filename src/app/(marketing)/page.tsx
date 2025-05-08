import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <main className="mt-8">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            ISO27001 Certification Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Generate a complete library of ISO27001 documents customized to your business, 
            and get ready for certification in days, not months.
          </p>
          <div className="flex justify-center">
            <LoginLink className="btn btn-dark">
              <Button size="lg">Start Your ISO Journey</Button>
            </LoginLink>
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Features Overview */}
        <section className="my-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Features</h2>
            <Button variant="outline" asChild>
              <Link href="/features" className="flex items-center">
                View All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Complete Document Library</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate all required policies, procedures, and records tailored to your business context.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Business-Specific Content</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Documents are customized to your business size, industry, and specific requirements.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Audit-Ready Results</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All documentation meets the strict requirements for ISO27001 certification audits.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* How It Works Overview */}
        <section className="my-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <Button variant="outline" asChild>
              <Link href="/how-it-works" className="flex items-center">
                Learn How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Fill Out Questionnaire</h3>
              <p className="text-sm text-muted-foreground">
                Answer questions about your business operations and context.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Review Gaps</h3>
              <p className="text-sm text-muted-foreground">
                Identify areas that need attention before certification.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Generate Documents</h3>
              <p className="text-sm text-muted-foreground">
                Our system creates all necessary documentation tailored to your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Get Certified</h3>
              <p className="text-sm text-muted-foreground">
                Use your customized document library for successful certification.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="my-20 py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl italic mb-6">
              &ldquo;Budgee ISO saved us months of work. We were able to prepare all our documentation 
              for ISO27001 in just two weeks, and passed our audit with flying colors.&rdquo;
            </p>
            <p className="font-bold">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">CTO, TechSolutions Inc.</p>
          </div>
        </section>
        
        {/* Pricing Overview */}
        <section className="my-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Pricing</h2>
            <Button variant="outline" asChild>
              <Link href="/pricing" className="flex items-center">
                View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-3xl font-bold mt-2">$999</p>
                <p className="text-sm text-muted-foreground">One-time payment</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for small businesses getting started with ISO27001
                </p>
                <div className="mt-4">
                  <Link href="/pricing" className="text-sm font-medium hover:underline flex items-center">
                    View plan details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-black relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">Professional</h3>
                <p className="text-3xl font-bold mt-2">$1,999</p>
                <p className="text-sm text-muted-foreground">One-time payment</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive solution for medium-sized businesses
                </p>
                <div className="mt-4">
                  <Link href="/pricing" className="text-sm font-medium hover:underline flex items-center">
                    View plan details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-3xl font-bold mt-2">Custom</p>
                <p className="text-sm text-muted-foreground">Contact sales</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tailored solution for larger organizations with complex needs
                </p>
                <div className="mt-4">
                  <Link href="/pricing" className="text-sm font-medium hover:underline flex items-center">
                    View plan details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
