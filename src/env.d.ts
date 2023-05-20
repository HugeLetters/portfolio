/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Section = {
  label: string;
  id: string;
  Component(_props: Record<string, unknown>): unknown;
};
