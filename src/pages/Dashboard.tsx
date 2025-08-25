
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { PlayCircle, Plus, Zap, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WorkflowPanel } from "@/components/WorkflowPanel";
import { ChatPanel } from "@/components/ChatPanel";

interface Tool {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error' | 'warning';
  progress: number;
  commands: string[];
  logs: string[];
  metadata: Record<string, string>;
  error?: string;
}

const mockTools: Tool[] = [
  {
    name: "Docker",
    status: "success" as const,
    progress: 100,
    commands: [
      "docker build -t myapp:latest .",
      "docker tag myapp:latest registry.io/myapp:v1.2.3"
    ],
    logs: [
      "Building image myapp:latest",
      "Step 1/5 : FROM node:18-alpine", 
      "Successfully built 8f7a9b3c4d5e",
      "Successfully tagged myapp:latest"
    ],
    metadata: {
      "Image ID": "8f7a9b3c4d5e",
      "Base Image": "node:18-alpine", 
      "Size": "127 MB",
      "Created": "2 minutes ago"
    }
  },
  {
    name: "Jenkins",
    status: "running" as const,
    progress: 65,
    commands: [
      "jenkins-cli build deploy-pipeline",
      "jenkins-cli console deploy-pipeline"
    ],
    logs: [
      "Starting pipeline execution",
      "Fetching source from Git repository",
      "Running test suite... ✓ 45/45 tests passed", 
      "Preparing deployment artifacts..."
    ],
    metadata: {
      "Build Number": "#127",
      "Branch": "main",
      "Commit": "a1b2c3d",
      "Triggered By": "AI Assistant"
    }
  },
  {
    name: "Kubernetes", 
    status: "pending" as const,
    progress: 0,
    commands: [
      "kubectl apply -f deployment.yaml",
      "kubectl set image deployment/myapp myapp=registry.io/myapp:v1.2.3"
    ],
    logs: [
      "Waiting for Jenkins pipeline to complete...",
      "Deployment configuration ready",
      "Preparing Kubernetes resources"
    ],
    metadata: {
      "Namespace": "production",
      "Deployment": "myapp", 
      "Replicas": "3",
      "Strategy": "RollingUpdate"
    }
  }
];

const Dashboard = () => {
  const { t } = useTranslation();
  const [tools, setTools] = useState(mockTools);
  const [newPrompt, setNewPrompt] = useState("");

  const handlePromptSubmit = (prompt: string) => {
    console.log("New workflow prompt:", prompt);
    // Here you would typically start a new workflow
  };

  const handleEditTool = (toolName: string) => {
    console.log("Edit tool:", toolName);
  };

  const handleRerunTool = (toolName: string) => {
    console.log("Rerun tool:", toolName);
  };

  const handleAiRetry = (toolName: string) => {
    console.log("AI retry for:", toolName);
    setTools(prev => prev.map(tool => 
      tool.name === toolName 
        ? { ...tool, status: 'running' as const, progress: 0 }
        : tool
    ));
  };

  const handlePromptEdit = (toolName: string, prompt: string) => {
    console.log("Prompt edit for:", toolName, prompt);
    setTools(prev => prev.map(tool => 
      tool.name === toolName 
        ? { ...tool, status: 'running' as const, progress: 0 }
        : tool
    ));
  };

  const activeWorkflows = tools.filter(tool => tool.status === 'running').length;
  const completedToday = 12;
  const successRate = 98.5;
  const avgDeployTime = "4.2m";

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="responsive-grid">
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Active Workflows</CardTitle>
            <div className="p-3 rounded-2xl bg-status-running/10">
              <PlayCircle className="h-5 w-5 text-status-running" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-status-running">{activeWorkflows}</div>
            <p className="text-sm text-muted-foreground mt-1">Running right now</p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Completed Today</CardTitle>
            <div className="p-3 rounded-2xl bg-status-success/10">
              <CheckCircle className="h-5 w-5 text-status-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-status-success">{completedToday}</div>
            <p className="text-sm text-muted-foreground mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Success Rate</CardTitle>
            <div className="p-3 rounded-2xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{successRate}%</div>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Avg Deploy Time</CardTitle>
            <div className="p-3 rounded-2xl bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{avgDeployTime}</div>
            <p className="text-sm text-muted-foreground mt-1">-30s from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <Card className="modern-panel">
        <div className="modern-panel-header">
          <CardTitle className="text-2xl text-foreground">Quick Start</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Describe your deployment workflow and let our AI orchestrate the tools automatically
          </CardDescription>
        </div>
        <div className="modern-panel-content">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Deploy React app to production with Docker and Kubernetes..."
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="flex-1 bg-background border-border rounded-xl h-12"
            />
            <Button 
              onClick={() => handlePromptSubmit(newPrompt)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-8 whitespace-nowrap modern-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start Workflow
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="responsive-panel-grid">
        {/* Workflow Panels */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Current Workflow</h2>
            <Badge variant="outline" className="status-running self-start sm:self-center">
              {tools.length} Tools in Pipeline
            </Badge>
          </div>
          
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <WorkflowPanel
                key={tool.name}
                tool={tool}
                onEdit={() => handleEditTool(tool.name)}
                onRerun={() => handleRerunTool(tool.name)}
                onAiRetry={() => handleAiRetry(tool.name)}
                onPromptEdit={(prompt) => handlePromptEdit(tool.name, prompt)}
              />
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-1">
          <ChatPanel onPromptSubmit={handlePromptSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
