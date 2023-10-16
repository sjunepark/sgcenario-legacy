<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import { logger } from "$lib/utils/logger";

    let { class: classProps, ...restProps } = $$restProps;
    export let text: string;

    $: logger.info(text);
</script>

<!--enhance: when inserting text and removing it, the placeholder disappears since there is a br tag inserted. Need javascript-->
<!-- svelte-ignore a11y-missing-content -->
<h2
    contenteditable="true"
    data-placeholder="제목"
    class="{twMerge(classProps, 'focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
    bind:innerText="{text}"
    {...restProps}
></h2>
