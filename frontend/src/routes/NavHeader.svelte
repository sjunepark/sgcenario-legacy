<script lang="ts">
	import { writable } from "svelte/store";

	const navLinks: { name: string; url: string }[] = [
		{ name: "대본", url: "/script" },
		{ name: "서재", url: "/" },
		{ name: "도움말", url: "/" },
		{ name: "프로필", url: "/" },
		{ name: "놀이터", url: "/sandbox" },
	];

	let activeLink = writable(0);
</script>

<header
	class="global-container fixed left-1/2 top-0 z-10 min-w-max -translate-x-1/2 transform py-4"
>
	<div class="flex items-center">
		<h1 class="flex-1 text-xl"><span class="font-semibold text-emerald-600">SG</span>cenario</h1>
		<div class="max-w-min flex-1 justify-center">
			<nav class="pointer-events-auto block">
				<ul
					class="flex rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur"
				>
					{#each navLinks as link, index (index)}
						<li class="">
							<a class="relative block whitespace-nowrap px-3 py-2" href={link.url}>
								{#if $activeLink === index}
									<span
										class="absolute inset-x-1 -bottom-px h-0.5 bg-gradient-to-r from-stone-500/0 via-stone-500/40 to-stone-500/0"
									></span>
								{/if}
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
		<div class="flex flex-1 justify-end">
			<div class="pointer-events-auto">
				<button
					type="button"
					aria-label="Switch to light theme"
					class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
				>
					<svg
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-stone-50 [@media(prefers-color-scheme:dark)]:stroke-stone-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-stone-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-stone-600"
					>
						<path
							d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
						></path>
						<path
							d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
							fill="none"
						></path>
					</svg>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-stone-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-stone-500"
					>
						<path
							d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</header>
