<template>
  <div id="graph-node-container" @click="clickNodeContainer()">
    <div id="graph-node"></div>
  </div>
</template>

<script>
export default {
  methods: {
    clickNodeContainer() {
      // 获取 graph-node-container 节点
      const container = document.getElementById("graph-node-container");

      // 隐藏节点
      container.style.visibility = "hidden";
      // container.style.display = "none"; // 或 container.style.visibility = "hidden";
    },
  },
};
</script>

<style scoped>
#graph-node-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

#graph-node {
  width: 90%;
  height: 90%;
  background-color: #f0f0f0;
}
</style>