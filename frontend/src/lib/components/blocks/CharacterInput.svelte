<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { Check } from "lucide-svelte";
	import { fly } from "svelte/transition";

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		preventScroll: true,
		forceVisible: true
	});

	type Character = string;
	let characters: Character[] = ["세준", "슬기", "동걸"];

	$: filteredCharacters = $touchedInput
		? characters.filter((character) => {
				const normalizedInput = $inputValue.toLowerCase();
				return character.toLowerCase().includes(normalizedInput);
		  })
		: characters;

	let inputElement: HTMLInputElement;

	function handleClickOrKeyPress(event) {
		if (event.type === "click" || event.key === "Enter" || event.key === " ") {
			inputElement.focus();
		}
	}
</script>

<div
	class="group w-full cursor-pointer"
	on:click={handleClickOrKeyPress}
	on:keydown={handleClickOrKeyPress}
	role="button"
	tabindex="0"
	aria-label="인물 편집"
>
	<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label {...$label} use:label class="hidden">
		<span>인물:</span>
	</label>

	<input
		bind:this={inputElement}
		{...$input}
		use:input
		type="text"
		class="group-hover:ring-inside block w-full rounded-md border-0 bg-transparent py-1.5 text-base leading-6 ring-0 ring-inset placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-stone-500 group-hover:ring-2 group-hover:ring-stone-500"
		placeholder="인물"
	/>
</div>
{#if $open}
	<ul
		class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg ring-1 ring-stone-300"
		{...$menu}
		use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
			tabindex="0"
		>
			{#each filteredCharacters as character, index (index)}
				<li
					{...$option({
						value: character,
						label: character
					})}
					use:option
					class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
        data-[highlighted]:bg-gray-200 data-[highlighted]:text-gray-900
          data-[disabled]:opacity-50"
				>
					{#if $isSelected(character)}
						<div class="check absolute left-2 top-1/2 z-10 text-gray-900">
							<Check class="square-4" />
						</div>
					{/if}
					<div class="pl-4">
						<span class="font-medium">{character}</span>
					</div>
				</li>
			{:else}
				<li
					class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
        data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style lang="postcss">
	.check {
		@apply absolute left-2 top-1/2 text-gray-500;
		translate: 0 calc(-50% + 1px);
	}
</style>
