import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, PostWithAuthor } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Profile() {
  const { userId } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: ["/api/users", userId],
    enabled: !!userId && isAuthenticated,
  });

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/users", userId, "posts"],
    enabled: !!userId && isAuthenticated,
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  useEffect(() => {
    if ((userError && isUnauthorizedError(userError as Error)) || 
        (postsError && isUnauthorizedError(postsError as Error))) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [userError, postsError, toast]);

  if (authLoading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-16 bg-white shadow-sm"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="h-48 w-full mb-8" />
            <Skeleton className="h-32 w-full mb-8" />
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
            <p className="text-gray-600">The user you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Anonymous User";
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }) : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-linkedin-blue to-blue-600"></div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=128&background=0066cc&color=ffffff`}
                  alt={fullName}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover bg-gray-100"
                />
              </div>
              
              <div className="mt-4 sm:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                {user.bio && (
                  <p className="text-lg text-gray-600 mt-2">{user.bio}</p>
                )}
                
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  {joinDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {joinDate}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button variant="outline" className="border-linkedin-blue text-linkedin-blue hover:bg-linkedin-light-blue">
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Posts</h2>
          
          {postsLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} showAuthor={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
