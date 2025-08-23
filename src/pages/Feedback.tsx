import { useState } from "react";
import { MessageCircle, Star, Send, Lightbulb, Bug, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const recentFeedback = [
    {
      id: 1,
      type: "Feature Request",
      title: "Add support for GitLab runners",
      status: "In Progress",
      votes: 23,
      date: "2 days ago"
    },
    {
      id: 2,
      type: "Bug Report", 
      title: "Docker build timeout issues",
      status: "Fixed",
      votes: 15,
      date: "1 week ago"
    },
    {
      id: 3,
      type: "Feature Request",
      title: "Workflow templates library",
      status: "Planned",
      votes: 31,
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feedback Center</h1>
          <p className="text-muted-foreground mt-2">
            Help us improve AIaaS platform with your valuable feedback
          </p>
        </div>
        <Badge variant="outline" className="status-success">
          Your voice matters
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Submitted</CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Features Implemented</CardTitle>
            <Lightbulb className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">23</div>
            <p className="text-xs text-muted-foreground">From user requests</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugs Fixed</CardTitle>
            <Bug className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">87</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <Heart className="h-4 w-4 text-error-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>
              Share your thoughts, report bugs, or request new features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="bug">Bug Report</TabsTrigger>
                <TabsTrigger value="feature">Feature Request</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label>How would you rate your experience?</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                          star <= rating 
                            ? 'fill-warning-orange text-warning-orange' 
                            : 'text-muted-foreground hover:text-warning-orange'
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="general-feedback">Your Feedback</Label>
                  <Textarea 
                    id="general-feedback"
                    placeholder="Tell us about your experience with the platform..."
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </TabsContent>

              <TabsContent value="bug" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bug-title">Bug Title</Label>
                  <Input 
                    id="bug-title"
                    placeholder="Brief description of the bug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bug-steps">Steps to Reproduce</Label>
                  <Textarea 
                    id="bug-steps"
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. Expected vs actual behavior..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <RadioGroup defaultValue="medium">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low - Minor inconvenience</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium - Affects workflow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High - Blocks critical functions</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full bg-error-red hover:bg-error-red/90">
                  <Bug className="w-4 h-4 mr-2" />
                  Report Bug
                </Button>
              </TabsContent>

              <TabsContent value="feature" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feature-title">Feature Title</Label>
                  <Input 
                    id="feature-title"
                    placeholder="What feature would you like to see?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feature-description">Description</Label>
                  <Textarea 
                    id="feature-description"
                    placeholder="Describe the feature and how it would help you..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feature-use-case">Use Case</Label>
                  <Textarea 
                    id="feature-use-case"
                    placeholder="When and how would you use this feature?"
                    rows={2}
                  />
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Submit Feature Request
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Recent Community Feedback</CardTitle>
            <CardDescription>
              See what other users are suggesting and vote on ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={
                            item.type === "Bug Report" ? "status-error" : "status-pending"
                          }
                        >
                          {item.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "Fixed" ? "status-success" :
                            item.status === "In Progress" ? "status-running" :
                            "status-warning"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                    </div>
                    <div className="text-center ml-4">
                      <div className="text-lg font-bold text-primary">{item.votes}</div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap Preview */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Development Roadmap</CardTitle>
          <CardDescription>
            See what we're working on based on your feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-status-running">In Progress</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-running rounded-full"></div>
                  GitLab CI/CD integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-running rounded-full"></div>
                  Advanced workflow templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-running rounded-full"></div>
                  Mobile app for monitoring
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-status-warning">Planned</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-warning rounded-full"></div>
                  Multi-cloud deployment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-warning rounded-full"></div>
                  AI-powered optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-warning rounded-full"></div>
                  Custom integrations SDK
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-status-success">Completed</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-success rounded-full"></div>
                  Real-time log streaming
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-success rounded-full"></div>
                  Workflow error recovery
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-success rounded-full"></div>
                  Enhanced security model
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;