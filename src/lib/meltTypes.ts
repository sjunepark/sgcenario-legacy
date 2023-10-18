import type { createCombobox, createDropdownMenu, createToolbar } from "@melt-ui/svelte";

export type ComboboxProps = ReturnType<typeof createCombobox>;
export type ToolbarProps = ReturnType<typeof createToolbar>;
export type DropdownMenuProps = ReturnType<typeof createDropdownMenu>;
export type RadioMenuGroupProps = ReturnType<DropdownMenuProps["builders"]["createMenuRadioGroup"]>;
