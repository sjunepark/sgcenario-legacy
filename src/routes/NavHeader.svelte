<script lang="ts">
    import TheButton from "$lib/components/buttons/TheButton.svelte";
    import { goto } from "$app/navigation";
    import type { User } from "lucia";

    export let pathname: string;
    export let user: User | undefined;
    const displayedUser = user?.userName ?? user?.email;

    const navLinks: { name: string; url: string }[] = [
        { name: "대본", url: "/script" },
        { name: "놀이터", url: "/sandbox" },
    ];
</script>

<header
    class="global-container fixed left-1/2 top-0 z-10 min-w-max -translate-x-1/2 transform py-4"
>
    <div class="flex items-center">
        <h1 class="flex-1 text-xl">
            <span class="font-semibold text-emerald-600">SG</span>cenario
        </h1>
        <div class="max-w-min flex-1 justify-center">
            <nav class="pointer-events-auto block">
                <ul
                    class="flex rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur"
                >
                    {#each navLinks as link, index (index)}
                        <li class="">
                            <a
                                class="relative block whitespace-nowrap px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-stone-50"
                                href="{link.url}"
                            >
                                {#if pathname === link.url}
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
        <div class="flex flex-1 items-center justify-end gap-x-3">
            {#if displayedUser}
                Hi, {displayedUser}
                <form method="post" action="/login?/logout">
                    <TheButton size="lg" type="submit">Log out</TheButton>
                </form>
            {:else}
                <TheButton size="lg" on:click="{() => goto('/login')}">Log in</TheButton>
            {/if}
        </div>
    </div>
</header>
