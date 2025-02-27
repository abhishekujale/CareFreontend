'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Activity, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
const PregnancyLandingPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b bg-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-pink-500" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            MaternaHealth
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>

          {/* Conditional Rendering */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Welcome, {user.fullName}</span>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button onClick={() => router.push("/auth/Signup")}>Get Started</Button>
          )}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 font-medium">Medical-Grade Assessment</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                <span className="block">Safe Pregnancy Journey</span>
                <span className="block text-blue-600">Starts With Awareness</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our evidence-based pregnancy risk assessment tool helps you monitor vital health parameters and identify potential risks early. Trusted by healthcare providers and mothers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => router.push('/Home')}>
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  For Healthcare Providers
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50k+</div>
                  <div className="text-sm text-gray-600">Monthly Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-gray-600">Clinics Trust Us</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden   p-2">
                <img
                  src="/images/image.png"
                  alt="Pregnant woman with healthcare provider"
                  className="rounded-xl w-3/4 h-auto"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold text-sm">Risk Assessment</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Blood Pressure</span>
                      <span className="text-green-600">Low Risk</span>
                    </div>
                    <Progress value={25} className="h-1.5 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Blood Sugar</span>
                      <span className="text-yellow-600">Medium Risk</span>
                    </div>
                    <Progress value={60} className="h-1.5 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white"></div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Comprehensive Health Monitoring</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our assessment tool monitors key pregnancy health parameters to provide a complete picture of potential risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Risk levels with color coding */}
            <Card className="overflow-hidden transition-all hover:shadow-lg border-t-4 border-green-500">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Low Risk Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Green indicators show parameters within healthy ranges, suggesting a low-risk pregnancy.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blood Pressure</span>
                      <span className="font-medium text-green-600">120/80</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blood Sugar</span>
                      <span className="font-medium text-green-600">85 mg/dL</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg border-t-4 border-yellow-500">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Medium Risk Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Yellow indicators highlight parameters that need monitoring but aren't immediately concerning.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Heart Rate</span>
                      <span className="font-medium text-yellow-600">105 bpm</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weight</span>
                      <span className="font-medium text-yellow-600">+12 kg</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg border-t-4 border-red-500">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Risk Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Red indicators signal parameters that require immediate attention from healthcare providers.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blood Pressure</span>
                      <span className="font-medium text-red-600">160/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blood Sugar</span>
                      <span className="font-medium text-red-600">140 mg/dL</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Medical-Grade Assessment</h3>
                <p className="text-gray-600">
                  Based on the latest clinical guidelines and medical research for accurate risk evaluation.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress Over Time</h3>
                <p className="text-gray-600">
                  Monitor your health metrics throughout your pregnancy with historical data tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-gray-600">
                  Receive tailored guidance based on your specific health profile and risk factors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process makes health monitoring during pregnancy easy and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Health Data</h3>
              <p className="text-gray-600">
                Input your blood pressure, blood sugar, heart rate, age, and weight measurements.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Instant Analysis</h3>
              <p className="text-gray-600">
                Our algorithm analyzes your data against medical guidelines to determine risk levels.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Review Recommendations</h3>
              <p className="text-gray-600">
                Receive color-coded risk assessments and personalized guidance for your pregnancy.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Try It Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This tool helped me identify my gestational diabetes early. The color-coded system made it easy to understand my risks."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-gray-500">Mother of 2</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "As an OB/GYN, I recommend this tool to all my patients. The data visualizations make explaining risks much easier."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Dr. Michelle L.</p>
                    <p className="text-sm text-gray-500">Obstetrician</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Having the color-coded progress bars helped me visualize my pregnancy risks and motivated me to make healthier choices."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Emma T.</p>
                    <p className="text-sm text-gray-500">First-time mother</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="ml-2 text-xl font-bold text-white">MaternaHealth</span>
              </div>
              <p className="text-sm text-gray-400">
                Evidence-based pregnancy risk assessment for expecting mothers and healthcare providers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Clinics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Pregnancy Health</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Factors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
            <p>© 2025 MaternaHealth. All rights reserved. Medical Disclaimer: This tool provides general information and is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PregnancyLandingPage;