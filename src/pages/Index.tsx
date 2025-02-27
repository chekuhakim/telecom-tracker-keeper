
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Radio, ShieldCheck, Receipt, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Site } from "@/types/database.types";

const Index = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");

  const { data: sites = [], isLoading } = useQuery({
    queryKey: ["sites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sites")
        .select("*");
      
      if (error) throw error;
      return data as Site[];
    },
  });

  const stats = [
    {
      title: "Total Sites",
      value: sites.length.toString(),
      description: "Active telecommunications sites",
      icon: Radio,
    },
    {
      title: "Insurance Expiring",
      value: sites.filter(site => site.insurance_status === "expiring").length.toString(),
      description: "Sites need attention",
      icon: ShieldCheck,
    },
    {
      title: "Pending Invoices",
      value: sites.filter(site => new Date(site.next_invoice_due) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length.toString(),
      description: "Due within 30 days",
      icon: Receipt,
    },
    {
      title: "Permit Renewals",
      value: sites.filter(site => site.permit_status === "expiring").length.toString(),
      description: "Due this month",
      icon: AlertTriangle,
    },
  ];

  useEffect(() => {
    const generateSummary = async () => {
      try {
        const { data: { generatedText }, error } = await supabase.functions.invoke('generate-summary', {
          body: { sites }
        });
        if (error) throw error;
        setSummary(generatedText);
      } catch (error) {
        console.error('Error generating summary:', error);
        setSummary("Unable to generate summary at this time.");
      }
    };

    if (sites.length > 0) {
      generateSummary();
    }
  }, [sites]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/auth");
    }
  };

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your telecommunications sites
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Add New Site</Button>
          </div>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <CardDescription>Quick overview of your sites</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{summary || "Generating summary..."}</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="backdrop-blur-sm bg-card/50 border shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sites.slice(0, 5).map((site) => (
                  <div key={site.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-muted-foreground">{site.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      site.status === 'active' ? 'bg-green-100 text-green-800' :
                      site.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {site.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Sites requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sites
                  .filter(site => site.insurance_status === "expiring" || site.permit_status === "expiring")
                  .slice(0, 5)
                  .map((site) => (
                    <div key={site.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{site.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {site.insurance_status === "expiring" ? "Insurance Expiring" : "Permit Expiring"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
