<script>
  import { createEventDispatcher } from "svelte";

  import EmptyContent from "./EmptyContent.svelte";
  import ConnectionForm from "./ConnectionForm.svelte";

  const dispatch = createEventDispatcher();

  export let selectedConnection;
  export let isNew = false;
</script>

<div class="main-content">
  {#if selectedConnection && !isNew}
    <ConnectionForm
      {selectedConnection}
      isNew={false}
      on:cancel={() => dispatch("cancel")}
      on:save={(ev) => dispatch("save", ev.detail)}
      on:delete={(ev) => dispatch("delete", ev.detail)}
    />
  {/if}

  {#if !selectedConnection && !isNew}
    <div class="empty-content">
      <EmptyContent on:newConnection={() => dispatch("newConnection")} />
    </div>
  {/if}

  {#if !selectedConnection && isNew}
    <ConnectionForm
      {selectedConnection}
      {isNew}
      on:cancel={() => dispatch("cancel")}
      on:save={(ev) => dispatch("save", ev.detail)}
    />
  {/if}
</div>

<style>
  .main-content {
    height: 100%;
    width: 100%;
  }

  .empty-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
