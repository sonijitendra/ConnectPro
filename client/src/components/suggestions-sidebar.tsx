import { Button } from "@/components/ui/button";

const mockSuggestions = [
  {
    id: "1",
    name: "Alex Thompson",
    title: "UX Designer at DesignCo",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  {
    id: "2",
    name: "Emily Davis",
    title: "Marketing Director",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  {
    id: "3",
    name: "David Kim",
    title: "DevOps Engineer",
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
];

const trendingTopics = [
  { tag: "#ArtificialIntelligence", count: "1,234 professionals talking about this" },
  { tag: "#RemoteWork", count: "987 professionals talking about this" },
  { tag: "#WebDevelopment", count: "756 professionals talking about this" },
  { tag: "#DataScience", count: "642 professionals talking about this" },
  { tag: "#Cybersecurity", count: "543 professionals talking about this" },
];

export default function SuggestionsSidebar() {
  return (
    <div className="space-y-6">
      {/* People You May Know */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">People you may know</h4>
        <div className="space-y-4">
          {mockSuggestions.map((person) => (
            <div key={person.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={person.profileImage}
                  alt={person.name}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.title}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-linkedin-blue text-linkedin-blue hover:bg-linkedin-light-blue"
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4 text-sm text-gray-600 hover:text-linkedin-blue">
          Show more
        </Button>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Trending in Technology</h4>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index}>
              <h5 className="text-sm font-medium text-gray-900 hover:text-linkedin-blue cursor-pointer">
                {topic.tag}
              </h5>
              <p className="text-xs text-gray-500">{topic.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
