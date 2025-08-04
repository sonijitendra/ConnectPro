import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Briefcase, TrendingUp } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-linkedin-blue">ConnectPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLogin}
                className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to your
            <span className="text-linkedin-blue"> professional community</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with professionals, share your insights, and build meaningful relationships 
            in your industry. Join thousands of professionals already networking on ConnectPro.
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white px-8 py-3 text-lg"
          >
            Join Now - It's Free
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-linkedin-blue mx-auto mb-4" />
              <CardTitle>Build Your Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with professionals in your industry and expand your network globally.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-linkedin-blue mx-auto mb-4" />
              <CardTitle>Share Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share your professional thoughts and engage with content from industry leaders.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-linkedin-blue mx-auto mb-4" />
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Discover opportunities, showcase your expertise, and advance your career.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-linkedin-blue mx-auto mb-4" />
              <CardTitle>Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep up with industry trends and insights from thought leaders.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to elevate your professional presence?
            </h2>
            <p className="text-gray-600 mb-6">
              Join ConnectPro today and start building meaningful professional relationships.
            </p>
            <Button
              onClick={handleLogin}
              size="lg"
              className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white px-8 py-3 text-lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ConnectPro</h3>
            <p className="text-gray-400">
              Building professional communities, one connection at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
