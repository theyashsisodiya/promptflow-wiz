
import { useState } from "react";
import { Activity, Clock, CheckCircle, AlertTriangle, Zap, Play, Pause, Settings, GitBranch, Server, Database, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [workflows] = useState([
    {
      id: 1,
      name: "Production Deploy - Node.js API",
      status: "running",
      progress: 65,
      duration: "4m 32s",
      steps: ["Build", "Test", "Deploy", "Verify"]
    },
    {
      id: 2,
      name: "Database Migration - PostgreSQL",
      status: "completed",
      progress: 100,
      duration: "2m 15s",
      steps: ["Backup", "Migrate", "Verify", "Cleanup"]
    },
    {
      id: 3,
      name: "Security Scan - Docker Images",
      status: "pending",
      progress: 0,
      duration: "0m 0s",
      steps: ["Scan", "Analyze", "Report", "Remediate"]
    }
  ]);

  const [integrations] = useState([
    { name: "GitHub", status: "connected", icon: "🐙", color: "bg-emerald-500/20 text-emerald-400" },
    { name: "Docker", status: "connected", icon: "🐳", color: "bg-blue-500/20 text-blue-400" },
    { name: "AWS", status: "connected", icon: "☁️", color: "bg-orange-500/20 text-orange-400" },
    { name: "Jenkins", status: "connected", icon: "⚙️", color: "bg-red-500/20 text-red-400" },
    { name: "Kubernetes", status: "connected", icon: "☸️", color: "bg-purple-500/20 text-purple-400" },
    { name: "Terraform", status: "connected", icon: "🏗️", color: "bg-violet-500/20 text-violet-400" }
  ]);

  const stats = [
    { title: "Active Workflows", value: "12", change: "+3", icon: Activity, color: "text-emerald-400" },
    { title: "Deployments Today", value: "24", change: "+8", icon: Zap, color: "text-blue-400" },
    { title: "Success Rate", value: "98.5%", change: "+2.1%", icon: CheckCircle, color: "text-purple-400" },
    { title: "Avg Deploy Time", value: "3m 42s", change: "-1m", icon: Clock, color: "text-orange-400" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Pause className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DevOps Dashboard
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Monitor and manage your infrastructure workflows in real-time
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="status-success text-base px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
              All Systems Operational
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="gradient-card border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from yesterday</p>
                </div>
                <div className={`p-3 rounded-2xl bg-muted/30`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows */}
        <div className="lg:col-span-2">
          <Card className="gradient-card border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                Active Workflows
              </CardTitle>
              <CardDescription>
                Real-time status of your running automation workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 rounded-2xl bg-muted/30 hover:bg-muted/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(workflow.status)}
                        <h4 className="font-semibold text-foreground">{workflow.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(workflow.status)} border`}>
                        {workflow.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{workflow.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Progress value={workflow.progress} className="h-2" />
                    <div className="flex items-center gap-2 flex-wrap">
                      {workflow.steps.map((step, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`text-xs rounded-full ${
                            index < Math.floor(workflow.progress / 25) ? 'bg-primary/20 text-primary border-primary/30' : 'border-border/50'
                          }`}
                        >
                          {step}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Connected Integrations */}
        <div className="space-y-6">
          <Card className="gradient-card border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent" />
                Connected Tools
              </CardTitle>
              <CardDescription>
                Your integrated DevOps tools and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{integration.icon}</div>
                    <span className="font-medium text-foreground">{integration.name}</span>
                  </div>
                  <Badge className={integration.color} variant="outline">
                    {integration.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 border border-primary/30">
                <GitBranch className="h-4 w-4" />
                Deploy Latest Build
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl hover:bg-primary/10">
                <Server className="h-4 w-4" />
                Scale Services
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl hover:bg-primary/10">
                <Database className="h-4 w-4" />
                Backup Database
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl hover:bg-primary/10">
                <Shield className="h-4 w-4" />
                Security Scan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
