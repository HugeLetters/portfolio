/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

type Section = {
  label: string;
  id: string;
  Component(_props: Record<string, unknown>): unknown;
};
