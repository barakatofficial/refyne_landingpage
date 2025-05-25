import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Check, Star, Users, Zap, Shield, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to add you to the waitlist.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('emails')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already on the list!",
            description: "You're already on our waitlist.",
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast({
          title: "You're on the list!",
          description: "We'll notify you when Evolux launches.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-black/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-black/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/refynemark.png" alt="Refyne logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-black">Refyne</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
              <a href="#tools" className="text-gray-600 hover:text-black transition-colors">Tools</a>
              <a href="#about" className="text-gray-600 hover:text-black transition-colors">About</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black fill-current" />
              <span className="text-xs sm:text-sm text-gray-700">Join the waiting list for early access</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Optimised Revision.
              <br className="hidden sm:block" />
              <span className="text-black block sm:inline">
                One Platform.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              The all-in-one revision platform powered by AI. Join the waiting list to be first in line.
            </p>

            {/* Email Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-black/10 border-black/20 text-black placeholder:text-gray-600 focus:bg-black/20 transition-all h-11 sm:h-12 text-base"
                  />
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-gray-800 text-white border-0 h-11 sm:h-12 px-6 sm:px-8 transition-all duration-300 hover:scale-105 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join Waiting List"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
                <div className="flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-lg p-3 sm:p-4">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base text-green-700 font-medium">You're on the waiting list!</span>
                </div>
              </div>
            )}

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-600 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Waiting List</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black fill-current" />
                <span>Early Access</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mt-20 sm:mt-32">
            <div className="text-center mb-10 sm:mb-16 px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
                What's Coming Soon?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Be among the first to experience our suite of AI-powered revision tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-0">
              {/* Feature 1 */}
              <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-black/10 transition-all duration-300 hover:scale-105 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">Blurtify</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Master any topic with our AI-powered blurt method. Get instant feedback and guidance as you learn, or choose guided sessions for structured revision.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-black/10 transition-all duration-300 hover:scale-105 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">Smart Flashcards</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Create and study with AI-generated flashcards, or make your own. Our spaced repetition system ensures you remember what matters.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-black/10 transition-all duration-300 hover:scale-105 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">Study Planner</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Stay on top of your studies with our comprehensive planner. Track deadlines, manage tasks, and optimize your study sessions with Pomodoro.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-20 sm:mt-32 text-center px-4 sm:px-0">
            <div className="bg-black/5 backdrop-blur-sm border border-black/20 rounded-2xl sm:rounded-3xl p-6 sm:p-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
                Ready to Transform Your Study Experience?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join the waiting list to be first in line when we launch. Get early access to our AI-powered revision tools.
              </p>
              {!isSubmitted && (
                <Button 
                  onClick={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    emailInput?.focus();
                  }}
                  className="bg-black hover:bg-gray-800 text-white border-0 h-11 sm:h-12 px-6 sm:px-8 transition-all duration-300 hover:scale-105 text-base"
                >
                  Join Waiting List
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-20 border-t border-black/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <img src="/refynemark.png" alt="Refyne logo" className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-semibold text-black">Refyne</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              © 2024 Refyne. All rights reserved. Optimising revision for the future.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
