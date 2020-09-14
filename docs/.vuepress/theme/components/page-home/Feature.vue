<template>
  <div class="feature">
    <div class="container">
      <div class="row">
        <div class="col col--4">
          <h2>简单易用 告别繁琐</h2>
          <p>您无需学习各种技能，提供多种场景支持，拿来即用</p>
        </div>
        <div class="col col--4">
          <h2>纯 JavaScript</h2>
          <p>使用 JS 语言来写 mock 数据，无额外学习成本</p>
        </div>
        <div class="col col--4">
          <h2>可视化后台管理</h2>
          <p>提供配套的 UI 后台，可视化管理你的所有 mock 数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.feature {
  display: flex;
  align-items: center;
  padding: 4rem 0;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;

  .col {
    display: block;
    flex: 1 0;
    margin-left: 0;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
  }
}

</style>
