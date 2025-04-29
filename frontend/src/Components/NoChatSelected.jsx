import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div role="status" aria-live="polite" className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl sm:text-3xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60 sm:text-lg">
          Select a conversation from the sidebar to start chatting
        </p>

        {/* New conversation button */}
        <button className="btn btn-primary mt-4">
          Start a New Conversation
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;
