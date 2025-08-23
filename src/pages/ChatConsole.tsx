import { useState } from "react";
import { Send, Bot, User, Zap, Copy, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  workflowId?: string;
}

const ChatConsole = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'AIaaS Chat Console initialized. I can help you create, modify, and troubleshoot your DevOps workflows.',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      type: 'user',
      content: 'Deploy my React app to production using Docker and Kubernetes',
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: '3',
      type: 'assistant',
      content: 'I\'ll help you deploy your React app! I\'ll create a workflow that:\n\n1. Builds a Docker image from your React app\n2. Pushes it to your container registry\n3. Deploys to Kubernetes with rolling updates\n4. Sets up ingress and load balancing\n\nWorkflow #WF-2024-001 has been created and is now running.',
      timestamp: new Date(Date.now() - 2900000),
      workflowId: 'WF-2024-001'
    }
  ]);
  const [input, setInput] = useState('');
  const [workflowPrompt, setWorkflowPrompt] = useState('');

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
      const responses = [
        'I understand you want to modify the deployment. Let me analyze the current workflow and suggest the best approach.',
        'Creating a new workflow with your specifications. I\'ll integrate the necessary tools and configure them automatically.',
        'I\'ve identified an issue in your pipeline. Here\'s a quick fix that should resolve it.',
        'Your workflow is now optimized! I\'ve reduced deployment time by 35% and added automated rollback capabilities.'
      ];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleWorkflowPrompt = () => {
    if (!workflowPrompt.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `New workflow request: ${workflowPrompt}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setWorkflowPrompt('');
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4" />;
      case 'assistant': return <Bot className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getMessageClass = (type: string) => {
    switch (type) {
      case 'user': return 'bg-primary/10 border-primary/20';
      case 'assistant': return 'bg-accent/10 border-accent/20';
      default: return 'bg-muted/30 border-border';
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat Console</h1>
          <p className="text-muted-foreground mt-2">
            Interact with your AI assistant to manage workflows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-success">
            AI Online
          </Badge>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="gradient-card h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Workflow Assistant
              </CardTitle>
              <CardDescription>
                Ask questions, request modifications, or start new workflows
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 rounded-lg border ${getMessageClass(message.type)}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-muted-foreground">
                          {getMessageIcon(message.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {message.type === 'user' ? 'You' : 
                               message.type === 'assistant' ? 'AI Assistant' : 'System'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.workflowId && (
                              <Badge variant="outline" className="text-xs">
                                {message.workflowId}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground whitespace-pre-line">
                            {message.content}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your workflows..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Start New Workflow
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RotateCcw className="w-4 h-4 mr-2" />
                Debug Last Deployment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Save className="w-4 h-4 mr-2" />
                Save Chat as Template
              </Button>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Workflow Builder</CardTitle>
              <CardDescription>
                Describe your workflow in detail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={workflowPrompt}
                onChange={(e) => setWorkflowPrompt(e.target.value)}
                placeholder="I need to deploy a microservices application with..."
                rows={6}
                className="mb-4"
              />
              <Button 
                onClick={handleWorkflowPrompt}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Generate Workflow
              </Button>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Recent Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'React + Docker + K8s',
                  'Node.js Microservices',
                  'Python FastAPI Deploy',
                  'Static Site + CDN'
                ].map((template) => (
                  <Button
                    key={template}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setWorkflowPrompt(`Use template: ${template}`)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatConsole;