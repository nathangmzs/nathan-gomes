<script lang="ts">
  import type { Snippet } from "svelte";
  import { ClerkProvider } from "svelte-clerk";
  import "../app.css";

  const { children }: { children: Snippet } = $props();
  export const prerender = true;
</script>

<!-- ... -->

<ClerkProvider>
  {@render children()}
</ClerkProvider>
