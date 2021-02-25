<script lang="ts">
  import { onMount, tick, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { deleteQlikTask, getQlikTasks } from "./helpers";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tasks from "./components/Tasks.svelte";
  import Loader from "./components/Loader.svelte";
  import Switch from "./components/Switch.svelte";

  let loaded = false;

  let state = writable("light");
  setContext("ExternalTasks", {
    deleteTask: (index) => {
      let t = externalTasks[index];
      if (t.id) deleteQlikTask(t.id);
      if (!t.id) externalTasks = externalTasks.filter((_, i) => index !== i);
    },
    changeTheme: () => {
      toggle();
    },
  });

  setContext("Theme", state);

  $: externalTasks = [];

  async function createTask() {
    let emptyTask = {
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

    externalTasks = [...externalTasks, emptyTask];
  }

  function toggle() {
    state.update((t) => {
      if (t == "light") return "dark";
      if (t == "dark") return "light";
    });
    window.document.body.classList.toggle("dark-mode");
  }

  onMount(async () => {
    let rawData = await getQlikTasks();
    externalTasks = rawData.sort((a, b) => a.name.localeCompare(b.name));

    loaded = true;
  });
</script>

{#if !loaded}
  <div class="loader">
    <Loader />
  </div>
{:else}
  <div class="main">
    <div class="header">
      <Header />
    </div>
    <div class="tasks">
      <div class="tasks-header">
        Light <Switch on:change={toggle} /> Dark
      </div>
      <div class="tasks-list">
        <Tasks tasks={externalTasks} />
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
  <div class="fab" title="Add external task" on:click={createTask}>+</div>
{/if}

<style>
  :global(body) {
    /* background-color: #f2eee2; */
    /* color: #0084f6; */
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #1d3040;
    color: #bfc2c7;
  }

  .main {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 50px auto 40px;
    overflow: hidden;
  }

  .header {
    grid-row: 1;
  }

  .footer {
    padding: 5px 5px 5px 20px;
    /* padding-right: 20px; */
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .tasks {
    grid-row: 2;
    overflow: hidden;
    display: grid;
    grid-template-rows: 30px auto;
  }

  .tasks-header {
    align-self: end;
    justify-self: end;
    margin-right: 20px;
  }

  .tasks-list {
    overflow: auto;
  }
  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fab {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 6px 10px 0 #666;
    transition: all 0.1s ease-in-out;

    font-size: 35px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    line-height: 50px;

    position: fixed;
    z-index: 1000;
    right: 50px;
    bottom: 50px;
    color: white;
    background-color: #106cc8;
  }

  .fab:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }
</style>
