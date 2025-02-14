
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface PhaseInfo {
  phase: string;
  description: string;
  details: string;
}

const phaseInformation: Record<string, PhaseInfo> = {
  menstrual: {
    phase: "Menstrual Phase",
    description: "The period of menstrual bleeding",
    details: "This phase marks the beginning of your menstrual cycle when the uterine lining is shed. It typically lasts 3-7 days.",
  },
  follicular: {
    phase: "Follicular Phase",
    description: "The period of follicle development",
    details: "During this phase, follicles in your ovaries develop and mature, preparing for ovulation. This phase overlaps with menstruation and continues until ovulation.",
  },
  ovulation: {
    phase: "Ovulation Phase",
    description: "The release of a mature egg",
    details: "This is when a mature egg is released from the ovary. It typically occurs around day 14 of a 28-day cycle, though this can vary.",
  },
  luteal: {
    phase: "Luteal Phase",
    description: "Post-ovulation phase",
    details: "After ovulation, the follicle transforms into the corpus luteum, producing progesterone. This phase prepares the uterus for potential pregnancy.",
  },
};

interface CyclePhaseInfoProps {
  phase: keyof typeof phaseInformation;
}

export const CyclePhaseInfo: React.FC<CyclePhaseInfoProps> = ({ phase }) => {
  const info = phaseInformation[phase];

  return (
    <div className="inline-flex items-center">
      {/* Desktop tooltip */}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="hidden md:inline-flex items-center">
            <Info className="h-4 w-4 ml-1 text-accent hover:text-accent-dark transition-colors" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{info.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Mobile dialog */}
      <Dialog>
        <DialogTrigger className="md:hidden inline-flex items-center">
          <Info className="h-4 w-4 ml-1 text-accent hover:text-accent-dark transition-colors" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{info.phase}</DialogTitle>
            <DialogDescription>
              <p className="mt-2">{info.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">{info.details}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
