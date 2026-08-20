import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
              Build your next big idea <span className="text-blue-600">faster</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10">
              The complete toolkit for modern SaaS applications. Authentication, database, and beautiful UI components out of the box.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-500">Built on Next.js 14 and React Server Components for optimal performance.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure by Default</h3>
              <p className="text-gray-500">Enterprise-grade security with Firebase Authentication and Firestore Rules.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deploy Anywhere</h3>
              <p className="text-gray-500">Easily deploy to Firebase App Hosting or any Vercel-compatible edge network.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 py-12 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} ModernSaaS Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
