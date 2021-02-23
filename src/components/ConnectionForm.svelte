<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let selectedConnection;
  export let isNew;

  if (isNew) {
    selectedConnection = {
      name: "",
      enabled: true,
      maxRetries: 0,
      parameters: "",
      path: "",
      taskSessionTimeout: 1400,
      privileges: null,
      qlikUser: null,
      schemaPath: "ExternalProgramTask",
      taskType: 1,
      tags: [],
      customProperties: [],
    };
  }
</script>

<div class="connection-form">
  {#if isNew}
    <div class="title">Create new connection</div>
  {:else}
    <div class="title">Edit existing connection</div>
  {/if}
  <div class="form-group">
    <label for="">Name</label>
    <input
      class="input-control"
      bind:value={selectedConnection.name}
      placeholder="Connection name"
    />
  </div>

  <div class="form-group">
    <label for="">Enabled</label>
    <input
      class="input-control"
      type="checkbox"
      bind:checked={selectedConnection.enabled}
    />
    <label for="">Max Retries</label>
    <input
      class="input-control"
      type="number"
      bind:value={selectedConnection.maxRetries}
    />
    <label for="">Session timeout</label>
    <input
      class="input-control"
      type="number"
      bind:value={selectedConnection.taskSessionTimeout}
    />
  </div>

  <div class="form-group">
    <label for="">Parameter:</label>
    <input
      class="input-control"
      bind:value={selectedConnection.parameters}
      placeholder="C:\ExternalTask\index.js"
    />
  </div>

  <div class="form-group">
    <label for="">Path:</label>
    <input
      class="input-control"
      bind:value={selectedConnection.path}
      placeholder="C:\ExternalTask\index.js"
    />
  </div>

  <div class="form-group">
    <button on:click={() => dispatch("save", { selectedConnection, isNew })}
      >Save</button
    >
    <button on:click={() => dispatch("cancel")}>Cancel</button>

    {#if !isNew}
      <button
        class="delete-button"
        on:click={() => dispatch("delete", selectedConnection)}>Delete</button
      >
    {/if}
  </div>
</div>

<style>
  .connection-form {
    padding: 10px;
    /* display: grid; */
    /* width: 100%; */
  }

  .form-group {
    display: flex;
    flex-direction: row;
  }

  .form-group label {
    flex: none;
    display: block;
    width: 125px;
    font-weight: bold;
    font-size: 1em;
  }

  .form-group .input-control {
    flex: 1 1 auto;
    display: block;
    margin-bottom: 10px;
    /* margin-right: 8px; */
    padding: 4px;
    /* margin-top: -4px; */
  }

  button {
    padding: 5px 15px;
    margin: 5px;
    min-width: 100px;
    cursor: pointer;
  }

  .delete-button {
    margin-left: auto;
    margin-right: 0px;
  }

  .title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgrey;
  }
</style>
