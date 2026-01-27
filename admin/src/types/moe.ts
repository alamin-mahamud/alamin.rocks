// MoE (Mission & Objectives Engine) types

export interface Milestone {
  date: string;
  goal: string;
}

export interface Persona {
  id: number;
  name: string;
  arabic_name: string;
  domain: string;
  eventually: string;
  icon: string;
  color: string;
  one_thing: string | null;
  ritual: string | null;
  guardrail: string | null;
  points: string[];
  milestones: Milestone[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PersonaCreate {
  name: string;
  arabic_name: string;
  domain: string;
  eventually: string;
  icon?: string;
  color?: string;
  one_thing?: string;
  ritual?: string;
  guardrail?: string;
  points?: string[];
}

export interface PersonaUpdate {
  name?: string;
  arabic_name?: string;
  domain?: string;
  eventually?: string;
  icon?: string;
  color?: string;
  one_thing?: string;
  ritual?: string;
  guardrail?: string;
  points?: string[];
}

export interface Principle {
  id: number;
  name: string;
  arabic: string;
  meaning: string;
  verse: string | null;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PrincipleCreate {
  name: string;
  arabic: string;
  meaning: string;
  verse?: string;
  icon?: string;
}

export interface PrincipleUpdate {
  name?: string;
  arabic?: string;
  meaning?: string;
  verse?: string;
  icon?: string;
}

export interface ScheduleBlock {
  id: number;
  time: string;
  time_range?: string; // computed field for display
  block_name?: string; // computed field for display
  activity: string;
  duration?: string; // computed field for display
  persona_name: string;
}

export interface ScheduleBlockCreate {
  time: string;
  activity: string;
  persona_name: string;
}

export interface ScheduleTableRow {
  label: string;
  time_2200_0400: string;
  tahajjud_fajr: string;
  fajr_0800: string;
  time_0800_maghrib: string;
  maghrib_isha: string;
  isha_2200: string;
}

export interface ScheduleTable {
  headers: string[];
  rows: ScheduleTableRow[];
}

export interface LifestyleGuideline {
  id: number;
  title: string;
  description: string | null;
  is_active: boolean;
  order: number;
}

export interface LifestyleGuidelineCreate {
  title: string;
  description?: string;
  is_active?: boolean;
}

export interface MoESummary {
  super_objective: string;
  target_date: string;
  personas: Persona[];
  principles: Principle[];
  schedule_blocks: ScheduleBlock[];
  schedule_table: ScheduleTable;
  lifestyle_guidelines: LifestyleGuideline[];
  non_negotiables: string[];
  dua_for_success: string;
}

export interface MilestoneCreate {
  persona_id: number;
  date: string;
  goal: string;
}
