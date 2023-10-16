<script lang="ts">
    import BlockH2 from "./BlockH2.svelte";
    import BlockScene from "./BlockScene.svelte";
    import BlockAction from "./BlockAction.svelte";
    import BlockDialogue from "./BlockDialogue.svelte";
    import BlockTransition from "./BlockTransition.svelte";
    import type { ComponentType } from "svelte";
    import type { BlockType } from "./types";

    export let type: BlockType;
    export let text: string;

    let options: { type: BlockType; component: ComponentType }[] = [
        { type: "h2", component: BlockH2 },
        { type: "scene", component: BlockScene },
        { type: "action", component: BlockAction },
        { type: "dialogue", component: BlockDialogue },
        { type: "transition", component: BlockTransition },
    ];
</script>

<svelte:component this="{options.find((o) => o.type === type)?.component}" {text} class="" />
