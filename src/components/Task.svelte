<script>
  import { getContext } from "svelte";
  import { updateQlikTask, createQlikTask } from "../helpers";
  import TaskForm from "./TaskOperationalForm.svelte";

  export let task;
  export let index;

  let localTask = { ...task };

  const { deleteTask } = getContext("ExternalTasks");
  const theme = getContext("Theme");

  let color;
  //   $: console.log($theme);
  $: if (theme == "light") {
    color = "#f2eee2";
  }

  $: if (theme == "dark") {
    color = "#1d3040";
  }

  let isExpandedOperational = false;
  let isExpandedTriggers = false;

  function expandOperational() {
    isExpandedOperational = !isExpandedOperational;
  }

  function expandTriggers() {
    isExpandedTriggers = !isExpandedTriggers;
  }

  async function saveTask() {
    if (localTask.id) await updateQlikTask(localTask);
    if (!localTask.id) await createQlikTask(localTask);
  }

  async function deleteCurrentTask() {
    deleteTask(index);
  }

  function cancelChanges() {
    localTask = { ...task };
  }

  function collapseAll() {
    if (isExpandedOperational || isExpandedTriggers) {
      isExpandedOperational = false;
      isExpandedTriggers = false;
      return true;
    }

    if (!isExpandedOperational && !isExpandedTriggers) {
      isExpandedOperational = true;
      isExpandedTriggers = true;
      return true;
    }
  }
</script>

<div class="cell-container" style="--theme-color: {color}">
  <div
    class="status"
    class:enabled={localTask.enabled}
    class:disabled={!localTask.enabled}
    title={localTask.enabled ? "Task is ENABLED" : "Task is DISABLED"}
  />
  <div class="content">
    <div class="title" on:click={collapseAll} title="Collapse/Expand all">
      {localTask.name}
    </div>
    <div class="operational">
      <div class="divider">
        <div
          class="section-title"
          on:click={expandOperational}
          title="Collapse/Expand operational section"
        >
          OPERATIONAL&nbsp;&nbsp;&nbsp;
        </div>
        <div class="line-container">
          <div class="line" />
        </div>
        <div on:click={expandOperational}>
          <i
            class="arrow"
            class:up={isExpandedOperational}
            class:down={!isExpandedOperational}
          />
        </div>
      </div>
      <div
        class="content"
        class:block={isExpandedOperational}
        class:none={!isExpandedOperational}
      >
        <TaskForm selectedConnection={localTask} />
      </div>
    </div>
    <div class="triggers">
      <div class="divider">
        <div
          class="section-title"
          on:click={expandTriggers}
          title="Collapse/Expand triggers section"
        >
          TRIGGERS&nbsp;&nbsp;&nbsp;
        </div>
        <div class="line-container">
          <div class="line" />
        </div>
        <div on:click={expandTriggers}>
          <i
            class="arrow"
            class:up={isExpandedTriggers}
            class:down={!isExpandedTriggers}
            title={isExpandedTriggers ? "Collapse" : "Expand"}
          />
        </div>
      </div>
      <div
        class="content"
        class:block={isExpandedTriggers}
        class:none={!isExpandedTriggers}
      >
        Content triggers here
      </div>
    </div>
    <div
      class="buttons"
      class:block={isExpandedTriggers || isExpandedOperational}
      class:none={!isExpandedTriggers && !isExpandedOperational}
    >
      <div class="buttons">
        <button on:click={saveTask}>Save</button>
        <button on:click={deleteCurrentTask}>Delete</button>
        <button on:click={cancelChanges}>Cancel</button>
      </div>
    </div>
  </div>
</div>

<style>
  .cell-container {
    display: grid;
    grid-template-columns: 5px auto;
    /* grid-template-rows: 30px auto auto auto; */
    /* grid-template-columns: 5px auto; */
    padding: 0px 16px 0px 0px;
    margin: 20px;
    background-color: var(--color);
    /* border: 1px solid #e8e8e8; */
    border-left: 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);
  }

  .content {
    display: grid;
    grid-template-rows: 30px auto auto auto;
    padding: 5px;
  }

  .status {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .title {
    grid-row: 1;
    cursor: pointer;
    font-weight: bold;
  }

  .operational {
    grid-row: 2;
  }

  .triggers {
    grid-row: 3;
  }

  .buttons {
    grid-row: 4;
  }

  .block {
    display: block;
  }

  .none {
    display: none;
  }

  .divider {
    display: grid;
    grid-template-columns: max-content auto 10px;
  }

  .line-container {
    display: flex;
    align-items: center;
  }

  .line {
    border-top: 1px solid #e9e9e9;
    width: 100%;
  }

  .arrow {
    border: solid lightgray;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin-left: 5px;
    cursor: pointer;
  }

  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  button {
    padding: 5px 15px;
    margin: 5px;
    min-width: 100px;
    cursor: pointer;
  }

  .section-title {
    cursor: pointer;
    font-size: 14px;
  }

  .enabled {
    /* background-color: teal; */
    background-color: #008000;
  }

  .disabled {
    background-color: gray;
  }
</style>
