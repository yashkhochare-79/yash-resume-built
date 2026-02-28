import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type GenerateType = "summary" | "experience" | "project";

export function useGenerateContent() {
  const [loading, setLoading] = useState<string | null>(null);

  const generate = async (type: GenerateType, context: Record<string, unknown>, id?: string) => {
    const loadingKey = id ? `${type}-${id}` : type;
    setLoading(loadingKey);
    try {
      const { data, error } = await supabase.functions.invoke("generate-resume-content", {
        body: { type, context },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success("Content generated!");
      return data.content as string;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to generate content";
      toast.error(msg);
      return null;
    } finally {
      setLoading(null);
    }
  };

  return { generate, loading };
}
