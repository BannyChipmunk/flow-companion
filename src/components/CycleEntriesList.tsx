
import React from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CyclePhaseInfo } from './CyclePhaseInfo';
import { Database } from '@/integrations/supabase/types';

type CyclePhase = Database['public']['Enums']['cycle_phase'];

interface CycleEntry {
  id: string;
  date: string;
  phase: CyclePhase;
  flow_intensity?: number;
  notes?: string;
  timing_status?: 'early' | 'on_time' | 'late';
}

interface CycleEntriesListProps {
  entries: CycleEntry[];
  onEntryClick: (entry: CycleEntry) => void;
}

const getTimingStatusColor = (status?: string) => {
  switch (status) {
    case 'early':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'late':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
    default:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
  }
};

export const CycleEntriesList: React.FC<CycleEntriesListProps> = ({
  entries,
  onEntryClick,
}) => {
  return (
    <Card className="w-full md:w-80 h-[calc(100vh-2rem)] dark:bg-dark-background-secondary">
      <CardHeader>
        <CardTitle className="text-lg font-medium dark:text-dark-text-primary">Cycle Entries</CardTitle>
        <CardDescription className="dark:text-dark-text-secondary">
          Click on an entry to view details
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onEntryClick(entry)}
                className="cursor-pointer group"
              >
                <Card className="transition-shadow hover:shadow-md dark:bg-dark-background-primary">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium dark:text-dark-text-primary">
                        {format(new Date(entry.date), 'MMM dd, yyyy')}
                      </CardTitle>
                      {entry.timing_status && (
                        <Badge className={getTimingStatusColor(entry.timing_status)}>
                          {entry.timing_status}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2 dark:text-dark-text-secondary">
                      <div className="flex items-center">
                        <span className="capitalize">{entry.phase}</span>
                        {entry.phase && <CyclePhaseInfo phase={entry.phase} />}
                      </div>
                      {entry.flow_intensity && (
                        <div className="mt-1">
                          Flow Intensity: {entry.flow_intensity}
                        </div>
                      )}
                      {entry.notes && (
                        <div className="mt-2 text-sm line-clamp-2">
                          {entry.notes}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
