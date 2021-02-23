<script lang="ts">
  import { tick } from "svelte";
  import {
    createQlikTask,
    deleteQlikTask,
    updateQlikTask,
    getQlikTasks,
  } from "./helpers";

  import Header from "./components/Header.svelte";
  import LeftMenu from "./components/LeftMenu.svelte";
  import MainContent from "./components/MainContent.svelte";
  import Loader from "./components/Loader.svelte";

  let selectedConnection;
  let isNew = false;

  async function selectConnection(ev) {
    isNew = false;

    await tick();

    if (!selectedConnection) {
      selectedConnection = ev.detail;
      return;
    }

    if (selectedConnection.id == ev.detail.id) {
      selectedConnection = "";
      return;
    }

    if (selectedConnection.id != ev.detail.id) {
      selectedConnection = ev.detail;
      return;
    }
  }

  async function newConnection() {
    isNew = true;
    selectedConnection = "";
  }

  function cancel() {
    isNew = false;
    selectedConnection = "";
  }

  async function save(ev) {
    if (ev.detail.isNew) await createQlikTask(ev.detail.selectedConnection);

    if (!ev.detail.isNew) await updateQlikTask(ev.detail.selectedConnection);

    externalTasks = getQlikTasks();
    isNew = false;
    selectedConnection = "";
  }

  async function deleteConnection(ev) {
    await deleteQlikTask(ev.detail.id);
    externalTasks = getQlikTasks();
    isNew = false;
    selectedConnection = "";
  }

  $: externalTasks = getQlikTasks();
</script>

{#await externalTasks}
  <div class="loader">
    <Loader />
  </div>
{:then connections}
  <div class="main">
    <div class="header">
      <Header />
    </div>
    <div class="left-menu">
      <LeftMenu
        {connections}
        on:selectConnection={selectConnection}
        {selectedConnection}
      />
    </div>
    <div class="content">
      <MainContent
        {selectedConnection}
        {isNew}
        on:newConnection={newConnection}
        on:cancel={cancel}
        on:save={save}
        on:delete={deleteConnection}
      />
    </div>
  </div>
{:catch error}
  <p style="color: red">{error}</p>
{/await}

<style>
  .main {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: 50px auto;
  }

  .header {
    grid-column: 1 / span 2;
    grid-row: 1;
  }

  .left-menu {
    grid-column: 1;
    grid-row: 2;
  }

  .content {
    grid-column: 2;
    grid-row: 2;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
