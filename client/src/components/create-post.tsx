import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { InsertPost } from "@shared/schema";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (postData: InsertPost) => {
      await apiRequest("POST", "/api/posts", postData);
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Success",
        description: "Your post has been shared!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate({ content: content.trim() });
  };

  const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") || "User" : "User";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=48&background=0066cc&color=ffffff`}
            alt="Your profile"
          />
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${user?.firstName || "there"}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-linkedin-blue">
                  <Image className="h-5 w-5 mr-2" />
                  Photo
                </Button>
                <Button type="button" variant="ghost" size="sm" className="text-gray-600 hover:text-linkedin-blue">
                  <Video className="h-5 w-5 mr-2" />
                  Video
                </Button>
              </div>
              <Button
                type="submit"
                disabled={!content.trim() || createPostMutation.isPending}
                className="bg-linkedin-blue text-white hover:bg-linkedin-dark-blue disabled:opacity-50"
              >
                {createPostMutation.isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
