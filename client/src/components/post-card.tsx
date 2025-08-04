import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { PostWithAuthor } from "@shared/schema";

interface PostCardProps {
  post: PostWithAuthor;
  showAuthor?: boolean;
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const fullName = [post.author.firstName, post.author.lastName].filter(Boolean).join(" ") || "Anonymous User";
  const timeAgo = post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : "";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        {showAuthor && (
          <div className="flex items-start space-x-4 mb-4">
            <Link href={`/profile/${post.author.id}`}>
              <img
                className="h-12 w-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                src={post.author.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=48&background=0066cc&color=ffffff`}
                alt={fullName}
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link href={`/profile/${post.author.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-linkedin-blue cursor-pointer">
                    {fullName}
                  </h3>
                </Link>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-500">{timeAgo}</span>
              </div>
              {post.author.bio && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{post.author.bio}</p>
              )}
            </div>
          </div>
        )}
        
        <div className="prose max-w-none">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-linkedin-blue">
                <Heart className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-linkedin-blue">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Comment</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-linkedin-blue">
                <Share2 className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
