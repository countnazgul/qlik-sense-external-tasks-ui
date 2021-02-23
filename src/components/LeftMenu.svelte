<script>
  import { createEventDispatcher } from "svelte";

  export let connections;
  export let selectedConnection;

  const dispatch = createEventDispatcher();
</script>

<div class="connections">
  {#each connections as connection}
    <div
      on:click={() => dispatch("selectConnection", connection)}
      class:connection
      class={selectedConnection && selectedConnection.id === connection.id
        ? "selected"
        : ""}
      title={connection.name}
    >
      {#if !connection.enabled} * {/if}
      {connection.name}
    </div>
  {/each}
</div>

<style>
  div {
    height: 100%;
    width: 100%;
  }

  .connection {
    height: fit-content;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .selected {
    background-color: lightgrey;
  }

  .connections {
    border-right: 2px solid gray;
  }
</style>
