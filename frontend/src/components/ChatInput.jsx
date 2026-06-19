import { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX } from 'lucide-react';

export default function ChatInput({ onSendMessage, isTyping, ttsEnabled, onToggleTts }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (input.trim() && !isTyping) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="max-w-4xl mx-auto relative group">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your documents..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-4 pr-24 py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none overflow-hidden min-h-[56px] transition-all shadow-sm"
          rows={1}
          disabled={isTyping}
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-1.5 h-10">

          {/* Global TTS Toggle */}
          <button
            type="button"
            onClick={onToggleTts}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${ttsEnabled
                ? 'bg-zinc-800 text-emerald-400 hover:bg-zinc-700'
                : 'bg-zinc-900/50 text-zinc-500 hover:text-zinc-300'
              }`}
            title={ttsEnabled ? 'Disable Text-to-Speech (Auto-Speak)' : 'Enable Text-to-Speech (Auto-Speak)'}
          >
            {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Send / Stop Buttons */}
          {isTyping ? (
            <button className="p-2 bg-zinc-800 text-zinc-400 rounded-lg cursor-not-allowed" disabled>
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-2">
        <p className="text-[10px] text-muted-foreground">
          AI can make mistakes. Consider verifying important information. Use Shift + Enter for new line.
        </p>
      </div>
    </div>
  );
}
