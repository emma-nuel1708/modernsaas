import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Activity, Shield, Globe, CheckCircle2, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Activity className="w-3 h-3 mr-1.5" /> Trusted by 1,000+ developers
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
              Know when your site <span className="text-blue-600">goes down</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10">
              Monitor your websites and APIs every minute. Get instant alerts via email, SMS, or Slack the second something breaks.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Start Monitoring Free <ArrowRight className="w-4 h-4" />
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
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Everything you need to stay online.</h2>
            <p className="mt-4 text-lg text-gray-500">Simple, reliable uptime monitoring that just works.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1-Minute Checks</h3>
              <p className="text-gray-500">We ping your website every 60 seconds so you know about outages before your customers do.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Alerts</h3>
              <p className="text-gray-500">Get notified through Email, SMS, or Slack the moment your website goes down or comes back up.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Monitoring</h3>
              <p className="text-gray-500">Checks run from multiple regions around the world to avoid false positives and ensure accuracy.</p>
            </div>
          </div>
        </div>

        {/* Pricing Preview Section */}
        <div className="bg-gray-100 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">Simple, transparent pricing.</h2>
              <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when you need more.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">$0<span className="text-lg font-medium text-gray-500">/mo</span></p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 1 Website Monitor</li>
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 1-Hour Check Interval</li>
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Email Alerts</li>
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </Link>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 border-blue-600 shadow-lg relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">$15<span className="text-lg font-medium text-gray-500">/mo</span></p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 20 Website Monitors</li>
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 1-Minute Check Interval</li>
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> SMS & Slack Alerts</li>
                  <li className="flex items-center text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Team Members</li>
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button className="w-full">Start Pro Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 py-12 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} UptimeHero. All rights reserved.</p>
      </footer>
    </div>
  );
}
