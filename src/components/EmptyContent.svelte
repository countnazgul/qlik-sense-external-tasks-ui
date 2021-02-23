<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="empty_state">
  <i class="ion-sad-outline" />
  <div>SELECT EXTERNAL TASK</div>
  <br />
  <div>OR</div>
  <button
    title="Create new connection"
    on:click={() => dispatch("newConnection")}>Create new one</button
  >
</div>

<style>
  .empty_state {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 8px 8px;
    margin: 20px auto auto auto;
    width: 50%;
    max-width: 200px;
    background: #348ac7;
    color: white;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-size: 12px;
  }
</style>
