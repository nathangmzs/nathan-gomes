<script lang="ts">
  export let teams;
  export let formData;

  import TeamSelection from "$lib/components/TeamSelection.svelte";
</script>

<section>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Pregame</h1>
    <h1 class="text-2xl font-semibold">1/4</h1>
  </div>
  <div class="mt-4">
  </div>
  <div class="flex flex-col justify-center gap-2">
    <div>
      <TeamSelection {teams} bind:selectedTeam={formData.teamNumber} bind:selectedLevel={formData.matchLevel} bind:matchNumber={formData.matchNumber}/>
    </div>
  </div>
</section>
