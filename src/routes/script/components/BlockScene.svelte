<script lang="ts">
    import { twMerge } from "tailwind-merge";

    let { class: classProps, ...restProps } = $$restProps;

    export let text: string;
</script>

<p
    class="{twMerge(
        classProps,
        'font-bold focus-visible:ring-offset-8 focus-visible:ring-offset-white',
    )}"
    contenteditable="true"
    data-placeholder="Location, INT. EXT. I/E. INT/EXT."
    bind:innerText="{text}"
    {...restProps}
></p>
