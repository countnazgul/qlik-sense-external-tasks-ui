<script>
  export let selectedConnection;
</script>

<div class="connection-form">
  <div class="details-0">
    <div class="connection-name form-group">
      <label for="">Name</label>
      <input
        class="input-control"
        bind:value={selectedConnection.name}
        placeholder="Connection name"
      />
    </div>
    <div class="enabled">
      <div class="enabled-label">Enabled</div>
      <div class="input-container">
        <input
          type="checkbox"
          class="input"
          bind:checked={selectedConnection.enabled}
        />
      </div>
    </div>
  </div>

  <div class="details-1">
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
  </div>

  <div class="details-2 form-group">
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
</div>

<style>
  /* input {
    color: #fff;
    background: #1d3040;
  } */

  .input-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    margin-bottom: 4px;
  }
  .input {
    margin-left: 0px;
    margin-bottom: 0px;
    margin-top: 0px;
    transform: scale(1.5);
  }

  .connection-form {
    padding: 5px;
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-rows: auto auto;
  }

  .details-0 {
    grid-row: 1;
    grid-column: 1 / span 2;
    display: flex;
  }

  .details-1 {
    grid-row: 2;
    grid-column: 1;
    padding-right: 10px;
  }

  .connection-name {
    flex-grow: 1;
    padding-right: 10px;
  }

  .details-2 {
    grid-row: 2;
    grid-column: 2;
  }

  .form-group {
    display: flex;
    flex-direction: column;
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
    /* margin-bottom: 10px; */
    padding: 4px;
  }

  .enabled {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* margin-top: 9px; */
  }

  .enabled-label {
    font-weight: bold;
    font-size: 1em;
  }
</style>
