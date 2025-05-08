import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">How It Works</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Your path to ISO27001 certification in four simple steps
        </p>
      
        <section className="my-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Fill Out Questionnaire</h3>
              <p className="text-muted-foreground mb-6">
                Answer questions about your business operations and context.
              </p>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold mb-3">What We'll Ask</h4>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Company size and structure
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Technology infrastructure
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Current security practices
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Business objectives
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Review Gaps</h3>
              <p className="text-muted-foreground mb-6">
                Identify areas that need attention before certification.
              </p>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold mb-3">Gap Analysis</h4>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Security control evaluation
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Risk assessment findings
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Implementation priorities
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Action plan creation
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Generate Documents</h3>
              <p className="text-muted-foreground mb-6">
                Our system creates all necessary documentation tailored to your needs.
              </p>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold mb-3">What You'll Receive</h4>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    All required policies
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Procedures documentation
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Risk register templates
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Implementation records
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Get Certified</h3>
              <p className="text-muted-foreground mb-6">
                Use your customized document library for successful certification.
              </p>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold mb-3">Certification Process</h4>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Implementation guidance
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Audit preparation
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Certification body selection
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Ongoing compliance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Approach</h2>
          
          <Card className="border border-gray-200 mb-8">
            <CardHeader>
              <h3 className="text-xl font-bold">Guided Implementation</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We don't just give you documents and leave you to figure it out. Our platform provides 
                step-by-step guidance on how to implement each control, policy, and procedure.
              </p>
              <p className="text-muted-foreground">
                Our approach ensures you understand not just what you need to do, but why it matters for 
                your information security management system.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader>
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
        </section>

        <section className="my-20 py-16 bg-gray-50 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Customer Success Story</h2>
            <p className="text-xl italic mb-6">
              &ldquo;The step-by-step approach made what seemed like an overwhelming process manageable. 
              We were able to achieve certification in just 3 months, much faster than we thought possible.&rdquo;
            </p>
            <p className="font-bold">Michael Chen</p>
            <p className="text-sm text-muted-foreground">Information Security Manager, DataSecure Ltd.</p>
          </div>
        </section>
      </div>
    </div>
  );
} 