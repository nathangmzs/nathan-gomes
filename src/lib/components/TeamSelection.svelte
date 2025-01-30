<script lang="ts">
    import RadioGroup from "./RadioGroup.svelte";
    import TextInput from "./TextInput.svelte";

    let {
        teams,
        selectedTeam = $bindable(),
        matchNumber = $bindable(1),
        selectedLevel = $bindable(),
    } = $props();

    let tournamentOptions = [
        { value: "practice", label: "Practice" },
        { value: "quali", label: "Quali" },
        { value: "playoff", label: "Playoff" },
    ];

    // funcs do NumberInput
    function handleIncrease() {
        matchNumber++;
    }

    function handleDecrease() {
        if (matchNumber > 1) matchNumber--;
    }

    // esquema para deixar as cores dos times diferentes
    function getTeamClasses(index: number) {
        if (index < 3) {
            return "bg-red-400 hover:bg-red-600 peer-checked:bg-red-700";
        } else {
            return "bg-blue-400 hover:bg-blue-600 peer-checked:bg-blue-700";
        }
    }
</script>

<div class="flex flex-col justify-center gap-4">
    <div>
        <div class="flex flex-col gap-1">
            <RadioGroup
                options={tournamentOptions}
                bind:selected={selectedLevel}
            />
        </div>
    </div>

    <div class="flex items-center justify-center">
        <p class="text-lg mr-4">Match number:</p>
        <button
            onclick={handleDecrease}
            type="button"
            class="h-10 w-10 rounded-l-full border border-black bg-sky-600 text-lg transition hover:bg-sky-500
             sm:h-12 sm:w-12 sm:text-xl md:h-14 md:w-14 md:text-2xl"
        >
            -
        </button>
        <input
            bind:value={matchNumber}
            class="h-10 w-16 border-b border-t border-black text-center text-lg
             sm:h-12 sm:w-20 sm:text-xl md:h-14 md:w-24 md:text-2xl"
        />
        <button
            onclick={handleIncrease}
            type="button"
            class="h-10 w-10 rounded-r-full border border-black bg-sky-600 text-lg transition hover:bg-sky-500
             sm:h-12 sm:w-12 sm:text-xl md:h-14 md:w-14 md:text-2xl"
        >
            +
        </button>
    </div>

    {#if selectedLevel === "quali"}
        <div class="grid grid-cols-3 gap-2">
            {#each teams.data[matchNumber - 1].teams as team, i}
                <label class="flex items-center justify-center">
                    <input
                        bind:group={selectedTeam}
                        type="radio"
                        name="amounte"
                        value={team.teamNumber}
                        class="appearance-none peer hidden"
                    />
                    <span
                        class={`cursor-pointer rounded-full px-6 h-10 w-full flex items-center justify-center text-lg transition text-white
            ${getTeamClasses(i)}`}
                    >
                        {team.teamNumber}
                    </span>
                </label>
            {/each}
        </div>
    {:else}
        <div>
            <TextInput placeholder="Team number" bind:value={selectedTeam} />
        </div>
    {/if}
</div>
