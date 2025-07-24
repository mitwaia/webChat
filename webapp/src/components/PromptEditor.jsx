export default function PromptEditor({ prompt, setPrompt, apiKey, setApiKey }) {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold mb-1">OpenAI API Key</h2>
                <input
                    type="password"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                    value={apiKey}
                    onChange={(e) => {
                        setApiKey(e.target.value);
                        localStorage.setItem("openai-api-key", e.target.value);
                    }}
                    placeholder="sk-..."
                />
            </div>
            <div>
                <h2 className="text-xl font-bold mb-1">System Prompt</h2>
                <textarea
                    className="w-full h-200 p-2 bg-gray-800 border border-gray-700 rounded resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
        </div>
    );
}
