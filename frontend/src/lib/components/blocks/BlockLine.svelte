<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { characters } from "$lib/stores/charactersStore";
	import { fly } from "svelte/transition";
	import { getContext } from "svelte";
	import type { DeepPartial } from "$lib/types";
	import type { Action } from "svelte/action";
	import type { Options } from "overlayscrollbars";
	import { OverlayScrollbars } from "overlayscrollbars";

	// DEV: For development purposes only
	export let textAreaValue = `이 세상은 참 복잡하고, 때로는 혼란스럽다. 사람들은 각자의 삶에서 행복을 찾기 위해 안간힘을 쓰고, 나 또한 그러하다. 사람들 사이에서 사랑과 이해를 주고받으며 살아가려 하지만, 때로는 이 세상이 내게 너무나 거대하고 무한한 것처럼 느껴진다.	내 인생의 방향을 잡으려 애쓰지만, 정작 중요한 것들은 늘 모호한 선상에 놓여 있다. 나는 이런 세상에서
	내 자리를 찾고 싶다. 내가 진정으로 원하는 것이 무엇인지, 내가 어떤 존재로 이 세상에 머무르고 싶은지를 찾아내고 싶다.	사람들과의 관계 속에서 느끼는 따스함과 이해는 나를 더욱 성장하게 만든다. 하지만 무엇보다 나 자신을 이해하고 사랑하는 것이 중요하다. 내 삶의 의미를 찾아가며, 나 자신을 사랑하고, 타인을 이해하며, 이 세상과`;
	const scrollbarStyle = getContext("scrollbarStyle") satisfies DeepPartial<Options>;

	const {
		elements: { menu, input, option },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		preventScroll: false, // There's a bug
		positioning: {
			placement: "bottom-start",
			sameWidth: false
		}
	});

	const setScrollbar: Action<HTMLElement> = (node) => {
		const osInstance = OverlayScrollbars(node, scrollbarStyle);
		return {
			destroy() {
				osInstance.destroy();
			}
		};
	};

	$: filteredCharacters = $touchedInput
		? $characters.filter((c) => c.toLowerCase().includes($inputValue.toLowerCase()))
		: $characters;
</script>

<p class="flex items-start gap-x-4 break-keep text-justify">
	<input {...$input} use:input class="w-[9ch]" />
	<span>{textAreaValue}</span>
</p>

{#if $open}
	<ul
		class="prose z-10 flex max-h-48 w-48 flex-col overflow-hidden bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
		{...$menu}
		use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<div use:setScrollbar class="flex max-h-full flex-col items-stretch overflow-y-auto">
			{#each filteredCharacters as character, index (index)}
				<li
					{...$option({
						value: character,
						label: character
					})}
					use:option
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
					class:bg-stone-200={$isSelected(character)}
				>
					<div>{character}</div>
				</li>
			{:else}
				<li
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
					{...$option({
						value: $inputValue,
						label: $inputValue
					})}
					use:option
				>
					<span>추가</span>
				</li>
			{/each}
		</div>
	</ul>
{/if}
