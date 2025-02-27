
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Site } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddSiteSheet } from "@/components/AddSiteSheet";

const Sites = () => {
  const [search, setSearch] = useState("");
  const [isAddSiteOpen, setIsAddSiteOpen] = useState(false);

  const { data: sites = [], isLoading } = useQuery({
    queryKey: ["sites"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sites").select("*");
      if (error) throw error;
      return data as Site[];
    },
  });

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Sites</h1>
            <p className="text-muted-foreground">
              Manage your telecommunications sites
            </p>
          </div>
          <Button onClick={() => setIsAddSiteOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Site
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading sites...</p>
          ) : (
            filteredSites.map((site) => (
              <Card key={site.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{site.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Location
                      </dt>
                      <dd>{site.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Status
                      </dt>
                      <dd>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            site.status === "active"
                              ? "bg-green-100 text-green-800"
                              : site.status === "maintenance"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {site.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Insurance
                      </dt>
                      <dd>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            site.insurance_status === "valid"
                              ? "bg-green-100 text-green-800"
                              : site.insurance_status === "expiring"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {site.insurance_status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <AddSiteSheet open={isAddSiteOpen} onOpenChange={setIsAddSiteOpen} />
      </div>
    </Layout>
  );
};

export default Sites;
