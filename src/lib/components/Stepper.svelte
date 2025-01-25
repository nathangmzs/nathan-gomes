<script>
  import AutonomousStep from '$lib/steps/AutonomousStep.svelte';
  import EndGameStep from '$lib/steps/EndGameStep.svelte';
  import PreGameStep from '$lib/steps/PreGameStep.svelte';
  import StartStep from '$lib/steps/StartStep.svelte';
  import TeleopStep from '$lib/steps/TeleopStep.svelte';

  let currentStep = $state(0);
  let { email, name } = $props();

  let formData = $derived({
    // pre
    name: name,
    email: email,
    teamNumber: '',
    matchNumber: 0,
    matchLevel: 'Quali',

    // auto
    removedAlgae: false,
    autoL1Corals: 0,
    autoL2Corals: 0,
    autoL3Corals: 0,
    autoL4Corals: 0,
    autoLeft: 'off',
    autoProcessor: 0,
    autoNet: 0,

    // tele
    playedDefense: 'off',
    robotFailed: 'off',
    teleL1Corals: 0,
    teleL2Corals: 0,
    teleL3Corals: 0,
    teleL4Corals: 0,
    teleProcessor: 0,
    teleNet: 0,

    // end
    endPark: 'off',
    endClimbAttempt: 'off',
    endClimbLevel: '',
    endClimbFailed: 'off',
    endFouls: 0,
    comments: ''
  });

  const steps = [StartStep, PreGameStep, AutonomousStep, TeleopStep, EndGameStep];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
    } else {
      submit();
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }

  async function submit() {
    console.log(formData);

    try {
      const res = await fetch('/processing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error(responseData.message);
        return;
      }
      console.log('Server response:', responseData);
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
    }
    location.reload()
  }
</script>

<section class="flex flex-col items-center">
  <!--<svelte:component this={steps[currentStep]} {formData} />-->
  {#key currentStep}
    {#if currentStep === 0}
      <StartStep {formData}/>
    {:else if currentStep === 1}
      <PreGameStep {formData}/>
    {:else if currentStep === 2}
      <AutonomousStep {formData}/>
    {:else if currentStep === 3}
      <TeleopStep {formData}/>
    {:else if currentStep === 4}
      <EndGameStep {formData}/>
    {/if}
  {/key}

  <div class="mt-6 flex w-full justify-between gap-4 sm:w-3/4 md:w-1/2">
    {#if currentStep > 0}
      <button
        onclick={previousStep}
        class="mx-4 flex-1 rounded-full bg-gray-300 px-4 py-2 font-semibold text-black transition hover:bg-gray-400 focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
      >
        Previous step
      </button>
    {/if}

    <button
      onclick={nextStep}
      class="mx-4 flex-1 rounded-full bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
    >
      {#if currentStep == 0}
        Start
      {:else if currentStep < steps.length - 1}
        Next step
      {:else}
        Finish
      {/if}
    </button>
  </div>
</section>
