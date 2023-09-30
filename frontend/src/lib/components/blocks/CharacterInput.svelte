<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { Check } from "lucide-svelte";
	import { fly } from "svelte/transition";
	import { derived } from "svelte/store";

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		preventScroll: false,
		forceVisible: true
	});

	type Character = string;
	let characters: Character[] = [
		"세준",
		"슬기",
		"동걸",
		"순현",
		"다원",
		"도현",
		"연재",
		"소담",
		"세기"
	];

	const fixed = derived([open, inputValue], ([$open, $inputValue]) => {
		return $inputValue.length > 0 && !$open;
	});

	$: console.log($fixed);

	$: filteredCharacters = $touchedInput
		? characters.filter((character) => {
				const normalizedInput = $inputValue.toLowerCase();
				return character.toLowerCase().includes(normalizedInput);
		  })
		: characters;

	let inputElement: HTMLInputElement;

	function handleClickOrKeyPress(event: MouseEvent | KeyboardEvent) {
		if (
			event instanceof MouseEvent ||
			(event instanceof KeyboardEvent && (event.key === "Enter" || event.key === " "))
		) {
			inputElement.focus();
		}
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
	class="group inline-block cursor-pointer"
	on:click={handleClickOrKeyPress}
	on:keydown={handleClickOrKeyPress}
	role="button"
	aria-label="인물 선택"
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
		class="group-hover:ring-inside inline-block w-4/5 rounded-md border-0 bg-transparent py-1.5 text-base leading-6 ring-0 ring-inset placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-stone-500 group-hover:ring-2 group-hover:ring-stone-500"
		placeholder="인물"
	/>
</div>
{#if $open}
	<ul
		class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-stone-500/50"
		{...$menu}
		use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white p-4" tabindex="0">
			{#each filteredCharacters as character, index (index)}
				<li
					{...$option({
						value: character,
						label: character
					})}
					use:option
					class="relative cursor-pointer scroll-my-2 rounded-md p-2
        data-[highlighted]:bg-stone-200
          data-[disabled]:opacity-50"
				>
					{#if $isSelected(character)}
						<Check
							class="square-4 absolute right-2 top-1/2 text-stone-500"
							style="translate: 0 calc(-50% + 1px)"
						/>
					{/if}
					<div class="pl-0">
						<span class="font-normal">{character}</span>
					</div>
				</li>
			{:else}
				<li
					class="relative cursor-pointer scroll-my-2 rounded-md p-2
        data-[highlighted]:bg-stone-200
          data-[disabled]:opacity-50"
					{...$option({
						value: $inputValue,
						label: $inputValue
					})}
					use:option
				>
					추가
				</li>
			{/each}
		</div>
	</ul>
{/if}
