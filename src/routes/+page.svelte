<script lang="ts">
  import { useClerkContext, UserButton } from "svelte-clerk";

  // Do not destructure context or you'll lose reactivity!
  const ctx = useClerkContext();
  const userId = $derived(ctx.auth.userId);
  const userFullName = $derived(ctx.user?.fullName);
  const userEmail = $derived(ctx.user?.primaryEmailAddress);

  import type { PageProps } from "./$types";
  import Stepper from "$lib/components/Stepper.svelte";

  let { data }: PageProps = $props();
</script>

{#if userId === undefined}
  <p>Loading...</p>
{:else if userId === null}
  <a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
{:else}
  <div class="ml-4 mt-4">
    <UserButton afterSignOutUrl="/" />
  </div>
  <section class="mt-10 flex flex-col justify-center">
    <Stepper name={userFullName} email={userEmail} teams={data} />
  </section>
{/if}
