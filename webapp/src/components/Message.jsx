export default function Message({ role, content }) {
    const isUser = role === "user";
    return (
        <div
            className={`p-3 max-w-xl rounded ${isUser ? "bg-blue-800 self-end" : "bg-gray-700 self-start"
                }`}
        >
            <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
    );
}
