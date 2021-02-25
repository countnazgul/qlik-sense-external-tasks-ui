<script>
  import Task from "./Task.svelte";

  export let tasks;
</script>

<div class="tasks">
  {#each tasks as task, index}
    <Task {task} {index} />
  {/each}
</div>

<style>
  .tasks {
    overflow: auto;
  }
</style>
