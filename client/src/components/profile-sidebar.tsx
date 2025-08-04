import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Settings } from "lucide-react";
import type { UserType } from "../../../shared/schema";

export default function ProfileSidebar() {
  const { user } = useAuth();
  const typedUser = user as UserType;

  if (!typedUser) {
    return null;
  }

  const fullName =
    [typedUser.firstName, typedUser.lastName].filter(Boolean).join(" ") ||
    "Anonymous User";

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover image background */}
        <div className="h-20 bg-gradient-to-r from-linkedin-blue to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center -mt-10">
            <img
              className="h-20 w-20 rounded-full border-4 border-white object-cover"
              src={
                typedUser.profileImageUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName
                )}&size=80&background=0066cc&color=ffffff`
              }
              alt="Profile"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {fullName}
            </h3>
            {typedUser.bio && (
              <p className="text-sm text-gray-600 text-center mt-1 line-clamp-3">
                {typedUser.bio}
              </p>
            )}
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Profile views</span>
              <span className="font-semibold text-linkedin-blue">127</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Post impressions</span>
              <span className="font-semibold text-linkedin-blue">1,542</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="space-y-3">
          <Link href={`/profile/${typedUser.id}`}>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-linkedin-blue hover:bg-gray-50"
            >
              <User className="h-4 w-4 mr-3" />
              View Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-linkedin-blue hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

