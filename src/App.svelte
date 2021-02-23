<script lang="ts">
  import type { Connection } from "./Interfaces";

  import { onMount, tick } from "svelte";
  import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

  import Header from "./components/Header.svelte";
  import LeftMenu from "./components/LeftMenu.svelte";
  import MainContent from "./components/MainContent.svelte";
  import Loader from "./components/Loader.svelte";

  let selectedConnection;
  let isNew = false;

  async function createConnection(connectionData) {
    await makeRequest("POST", "externalprogramtask", connectionData);
  }

  async function updateConnection(connectionData) {
    await makeRequest(
      "PUT",
      `externalprogramtask/${connectionData.id}`,
      connectionData
    );
  }

  async function getConnections(): Promise<Connection[]> {
    let response = await makeRequest("GET", "externalprogramtask/full");
    return response.data as Connection[];
  }

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
    if (ev.detail.isNew) await createConnection(ev.detail.selectedConnection);

    if (!ev.detail.isNew) await updateConnection(ev.detail.selectedConnection);

    connections1 = getConnections();
    isNew = false;
    selectedConnection = "";
  }

  async function deleteConnection(ev) {
    await makeRequest("DELETE", `externalprogramtask/${ev.detail.id}`);
    connections1 = getConnections();
    isNew = false;
    selectedConnection = "";
  }

  $: connections1 = getConnections();

  onMount(async () => {});

  export async function makeRequest(
    method: Method,
    path: string,
    data?: any
  ): Promise<AxiosResponse> {
    let config: AxiosRequestConfig = {
      method: method,
      url: `https://SENSE_HOST/jwt/qrs/${path}?xrfkey=123456789ABCDEFG`,
      headers: {
        authorization: `Bearer SENSE_JWT`,
        "x-Qlik-Xrfkey": "123456789ABCDEFG",
      },
    };

    if (data) config.data = data;

    const res = await axios(config);

    return res;
  }
</script>

{#await connections1}
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
