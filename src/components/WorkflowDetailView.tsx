
import { useState } from "react";
import { ChevronUp, Send, Bot, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkflowPanel } from "@/components/WorkflowPanel";
import { mockTools } from "@/data/mockTools";

interface WorkflowDetailViewProps {
  workflow: {
    id: number;
    name: string;
    status: string;
    progress: number;
    duration: string;
    steps: string[];
  };
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function WorkflowDetailView({ workflow, onClose }: WorkflowDetailViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `I'm monitoring your "${workflow.name}" workflow. You can ask me to modify steps, add new tools, or troubleshoot any issues.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll help you with that modification to your ${workflow.name} workflow. Let me update the pipeline configuration...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleEdit = () => {
    console.log("Edit workflow");
  };

  const handleRerun = () => {
    console.log("Rerun workflow");
  };

  return (
    <div className="mt-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{workflow.name}</h3>
          <p className="text-muted-foreground">Detailed workflow view with live monitoring</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-xl hover:bg-muted/50"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Steps - Left Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-semibold text-foreground mb-4">Pipeline Steps</h4>
          {mockTools.map((tool, index) => (
            <WorkflowPanel
              key={index}
              tool={tool}
              onEdit={handleEdit}
              onRerun={handleRerun}
            />
          ))}
        </div>

        {/* Workflow Chat - Right Column */}
        <div className="space-y-6">
          <Card className="gradient-card border-border/30 h-[600px] flex flex-col">
            <CardHeader className="border-b border-border/30">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bot className="w-5 h-5 text-primary" />
                Workflow Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1 mb-4 bg-background/30 rounded-lg border border-border/50 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div key={message.id} className={`p-3 rounded-lg border ${
                      message.type === 'user' 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'bg-accent/10 border-accent/20'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-muted-foreground">
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Modify workflow, add tools, or ask questions..."
                  className="flex-1 bg-background border-border rounded-lg"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
