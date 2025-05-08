import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Discover how Budgee ISO helps streamline your ISO27001 certification journey
        </p>
      
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Budgee ISO</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Complete Document Library</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate all required policies, procedures, and records tailored to your business context.
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Information Security Policy
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Risk Assessment Methodology
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Access Control Procedures
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Business Continuity Plan
                  </li>
                </ul>
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
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Industry-specific risks addressed
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Scales with your organization size
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tailored to your technology stack
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Compliant with regional regulations
                  </li>
                </ul>
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
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Compliant with latest ISO27001 standard
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Clear evidence annotations
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Traceability to control objectives
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Auditor-friendly format
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Additional Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Time & Cost Saving</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Save thousands in consulting fees and months of preparation time with our streamlined solution.
                </p>
                <p className="text-muted-foreground">
                  Our clients typically reduce their ISO27001 preparation time by 70% compared to traditional consulting approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">Continuous Improvement</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our platform helps you maintain compliance beyond certification with updates and reminders.
                </p>
                <p className="text-muted-foreground">
                  Stay ahead of changes to the ISO standard and evolving security threats with our regular updates.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="my-20 py-16 bg-gray-50 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
            <p className="text-xl italic mb-6">
              &ldquo;Budgee ISO saved us months of work. We were able to prepare all our documentation 
              for ISO27001 in just two weeks, and passed our audit with flying colors.&rdquo;
            </p>
            <p className="font-bold">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">CTO, TechSolutions Inc.</p>
          </div>
        </section>
      </div>
    </div>
  );
} 