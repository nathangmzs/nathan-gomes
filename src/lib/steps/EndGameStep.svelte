<script lang="ts">
    export let formData;

    import NumberInput from "$lib/components/NumberInput.svelte";
    import RadioGroup from "$lib/components/RadioGroup.svelte";
    import Switch from "$lib/components/Switch.svelte";
    import TextInput from "$lib/components/TextInput.svelte";

    let climbOptions = [
        { value: "shallow", label: "Shallow (Higher)" },
        { value: "deep", label: "Deep (Lower)" },
    ];
</script>

<section class="flex flex-col">
    <div>
        <div class="mb-4 flex w-full items-center justify-between">
            <h1 class="text-2xl font-semibold">End of Game</h1>
            <h1 class="text-2x l font-semibold">4/4</h1>
        </div>
        <div class="flex flex-col mb-6 mt-6 gap-2">
            <Switch
                label="Parked on Barge area"
                bind:value={formData.endPark}
            />
            <Switch
                label="Attempted to climb on a cage"
                bind:value={formData.endClimbAttempt}
            />

            {#if formData.endClimbAttempt == "on"}
                <div class="flex flex-col gap-2">
                    <RadioGroup
                        options={climbOptions}
                        bind:selected={formData.endClimbLevel}
                    />
                    {formData.climbLevel}

                    <Switch
                        label="Failed to climb"
                        bind:value={formData.endClimbFailed}
                    />
                </div>
            {/if}
        </div>
    </div>

    <div>
        <TextInput
            size="medium"
            placeholder="Comments"
            bind:value={formData.comments}
        />
    </div>

    <div class="flex flex-col mt-4">
        <h3>Fouls:</h3>
        <NumberInput bind:value={formData.endFouls} />
    </div>
</section>
