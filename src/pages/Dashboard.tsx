import { useState } from "react";
import { PlayCircle, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WorkflowPanel } from "@/components/WorkflowPanel";
import { ChatPanel } from "@/components/ChatPanel";

const mockTools = [
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
    logs: [],
    metadata: {
      "Namespace": "production",
      "Deployment": "myapp",
      "Replicas": "3",
      "Strategy": "RollingUpdate"
    }
  }
];

const Dashboard = () => {
  const [tools, setTools] = useState(mockTools);
  const [newPrompt, setNewPrompt] = useState("");

  const handlePromptSubmit = (prompt: string) => {
    console.log("New workflow prompt:", prompt);
    // Here you would typically start a new workflow
  };

  const handleEditTool = (toolName: string) => {
    console.log("Edit tool:", toolName);
    // Open edit dialog for the specific tool
  };

  const handleRerunTool = (toolName: string) => {
    console.log("Rerun tool:", toolName);
    // Rerun the specific tool step
  };

  const activeWorkflows = tools.filter(tool => tool.status === 'running').length;
  const completedToday = 12;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <PlayCircle className="h-4 w-4 text-status-running" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-running">{activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">Running right now</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Zap className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">{completedToday}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Badge className="status-success">98.5%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deploy Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground">-30s from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Quick Start New Workflow</CardTitle>
          <CardDescription>
            Describe your deployment needs in natural language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Deploy React app to production with Docker and Kubernetes..."
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handlePromptSubmit(newPrompt)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start Workflow
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Panels */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Current Workflow</h2>
            <Badge variant="outline" className="status-running">
              {tools.length} Tools in Pipeline
            </Badge>
          </div>
          
          {tools.map((tool, index) => (
            <WorkflowPanel
              key={tool.name}
              tool={tool}
              onEdit={() => handleEditTool(tool.name)}
              onRerun={() => handleRerunTool(tool.name)}
            />
          ))}
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