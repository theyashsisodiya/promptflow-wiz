
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { PlayCircle, Plus, Zap, TrendingUp, Clock, CheckCircle, AlertTriangle, Users, Server, GitBranch } from "lucide-react";
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
    name: "GitHub",
    status: "success" as const,
    progress: 100,
    commands: [
      "git clone https://github.com/user/repo.git",
      "git checkout -b feature/deployment"
    ],
    logs: [
      "Repository cloned successfully",
      "Switched to new branch 'feature/deployment'", 
      "Latest commit: a1b2c3d - Add deployment configuration",
      "Repository ready for CI/CD pipeline"
    ],
    metadata: {
      "Repository": "user/awesome-app",
      "Branch": "feature/deployment",
      "Last Commit": "a1b2c3d",
      "Contributors": "5"
    }
  },
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
      "Step 1/8 : FROM node:18-alpine", 
      "Step 8/8 : CMD [\"npm\", \"start\"]",
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
      "Building Docker image...",
      "Preparing deployment artifacts..."
    ],
    metadata: {
      "Build Number": "#127",
      "Branch": "feature/deployment",
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
      "Deployment configuration validated",
      "Kubernetes cluster connection established",
      "Preparing rolling update strategy"
    ],
    metadata: {
      "Namespace": "production",
      "Deployment": "myapp", 
      "Replicas": "3",
      "Strategy": "RollingUpdate"
    }
  },
  {
    name: "ArgoCD",
    status: "pending" as const,
    progress: 0,
    commands: [
      "argocd app sync myapp",
      "argocd app wait myapp --health"
    ],
    logs: [
      "Waiting for Kubernetes deployment...",
      "GitOps repository synchronized",
      "Application configuration ready",
      "Monitoring deployment health"
    ],
    metadata: {
      "Application": "myapp",
      "Repository": "https://github.com/user/k8s-manifests",
      "Target Revision": "HEAD",
      "Sync Policy": "Automated"
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
  const completedToday = 15;
  const successRate = 98.7;
  const avgDeployTime = "3.8m";
  const totalProjects = 24;
  const activeTeamMembers = 8;

  return (
    <div className="space-y-8">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Active Workflows</CardTitle>
            <div className="p-3 rounded-2xl bg-status-running/20 group-hover:bg-status-running/30 transition-colors">
              <PlayCircle className="h-5 w-5 text-status-running" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-status-running to-primary bg-clip-text text-transparent">
              {activeWorkflows}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Running right now</p>
          </CardContent>
        </Card>

        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Completed Today</CardTitle>
            <div className="p-3 rounded-2xl bg-status-success/20 group-hover:bg-status-success/30 transition-colors">
              <CheckCircle className="h-5 w-5 text-status-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-status-success to-accent bg-clip-text text-transparent">
              {completedToday}
            </div>
            <p className="text-sm text-muted-foreground mt-1">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Success Rate</CardTitle>
            <div className="p-3 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {successRate}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Avg Deploy Time</CardTitle>
            <div className="p-3 rounded-2xl bg-accent/20 group-hover:bg-accent/30 transition-colors">
              <Clock className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {avgDeployTime}
            </div>
            <p className="text-sm text-muted-foreground mt-1">-45s from last week</p>
          </CardContent>
        </Card>

        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Total Projects</CardTitle>
            <div className="p-3 rounded-2xl bg-warning-orange/20 group-hover:bg-warning-orange/30 transition-colors">
              <Server className="h-5 w-5 text-warning-orange" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-warning-orange to-primary bg-clip-text text-transparent">
              {totalProjects}
            </div>
            <p className="text-sm text-muted-foreground mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card className="stats-card group hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-foreground">Team Members</CardTitle>
            <div className="p-3 rounded-2xl bg-neon-green/20 group-hover:bg-neon-green/30 transition-colors">
              <Users className="h-5 w-5 text-neon-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-neon-green to-accent bg-clip-text text-transparent">
              {activeTeamMembers}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Start */}
      <Card className="modern-panel border-border/30 hover:border-primary/30 transition-all duration-300">
        <div className="modern-panel-header bg-gradient-to-r from-card to-muted/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered Quick Start
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2 text-lg">
                Describe your deployment workflow and let our AI orchestrate the tools automatically
              </CardDescription>
            </div>
          </div>
        </div>
        <div className="modern-panel-content">
          <div className="flex flex-col lg:flex-row gap-6">
            <Input
              placeholder="Deploy my React app to production with Docker, run tests, and set up monitoring..."
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="flex-1 bg-background border-border/50 rounded-2xl h-14 text-base px-6"
            />
            <Button 
              onClick={() => handlePromptSubmit(newPrompt)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-2xl px-8 h-14 text-base font-medium whitespace-nowrap modern-button"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start AI Workflow
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="outline" className="text-sm px-4 py-2 rounded-full hover:bg-primary/10 cursor-pointer transition-colors">
              <GitBranch className="w-4 h-4 mr-2" />
              Deploy to staging
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 rounded-full hover:bg-primary/10 cursor-pointer transition-colors">
              <Server className="w-4 h-4 mr-2" />
              Scale production
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 rounded-full hover:bg-primary/10 cursor-pointer transition-colors">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Rollback deployment
            </Badge>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Workflow Panels */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Current Workflow
              </h2>
              <p className="text-muted-foreground mt-1">AI-orchestrated deployment pipeline</p>
            </div>
            <Badge variant="outline" className="status-running self-start sm:self-center text-base px-4 py-2">
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

        {/* Enhanced Chat Panel */}
        <div className="xl:col-span-1">
          <ChatPanel onPromptSubmit={handlePromptSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
