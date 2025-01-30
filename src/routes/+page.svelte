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
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col justify-center">
            <img
                src="under.png"
                alt="Italian Trulli"
                class="w-40 h-40 mx-auto"
            />
            <div class="flex flex-col justify-center">
                <h1 class="text-2xl font-bold flex justify-center mb-2">
                    1156's Scouting
                </h1>
            </div>
            <div class="flex justify-center">
                <div>
                    <div
                        class="mx-4 flex-1 w-40 text-center rounded-full bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                    >
                        <a href="/sign-in">Sign in</a>
                    </div>
                    <div
                        class="mt-2 mx-4 flex-1 w-40 text-center rounded-full bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                    >
                        <a href="/sign-up">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="ml-4 mt-4">
        <UserButton afterSignOutUrl="/" />
    </div>
    <section class="mt-10 flex flex-col justify-center">
        <Stepper name={userFullName} email={userEmail} teams={data} />
    </section>
{/if}
