import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, User, Settings, LogOut } from "lucide-react";

export default function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") || "User" : "User";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-linkedin-blue cursor-pointer">ConnectPro</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <a className={`px-3 py-2 rounded-md text-sm font-medium border-b-2 transition-colors ${
                    location === "/" 
                      ? "text-gray-900 border-linkedin-blue" 
                      : "text-gray-500 hover:text-linkedin-blue border-transparent"
                  }`}>
                    Home
                  </a>
                </Link>
                <a href="#" className="text-gray-500 hover:text-linkedin-blue px-3 py-2 rounded-md text-sm font-medium">
                  My Network
                </a>
                <a href="#" className="text-gray-500 hover:text-linkedin-blue px-3 py-2 rounded-md text-sm font-medium">
                  Jobs
                </a>
                <a href="#" className="text-gray-500 hover:text-linkedin-blue px-3 py-2 rounded-md text-sm font-medium">
                  Messaging
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=32&background=0066cc&color=ffffff`}
                    alt="Profile"
                  />
                  <span className="hidden md:block text-gray-700 font-medium">{fullName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user && (
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.id}`}>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
