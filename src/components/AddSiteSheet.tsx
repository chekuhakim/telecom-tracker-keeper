
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddSiteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSiteSheet = ({ open, onOpenChange }: AddSiteSheetProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "active",
    insurance_status: "valid",
    permit_status: "valid",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("sites").insert([formData]);
      
      if (error) throw error;

      toast.success("Site added successfully");
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      onOpenChange(false);
      setFormData({
        name: "",
        location: "",
        status: "active",
        insurance_status: "valid",
        permit_status: "valid",
      });
    } catch (error) {
      toast.error("Error adding site");
      console.error("Error adding site:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Site</SheetTitle>
          <SheetDescription>
            Enter the details for the new telecommunications site.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Site Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="insurance_status" className="text-sm font-medium">
              Insurance Status
            </label>
            <Select
              value={formData.insurance_status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, insurance_status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select insurance status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="permit_status" className="text-sm font-medium">
              Permit Status
            </label>
            <Select
              value={formData.permit_status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, permit_status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select permit status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Site"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
