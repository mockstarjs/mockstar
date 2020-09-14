<template>
  <div class="advantage-one">
    <div class="container">
      <div class="row">
        <div class="col col--4">
          <h2>Get started in seconds</h2>
          <p>Whether you’re using React or another library, Create React App lets you <strong>focus on code, not build
            tools</strong>.<br><br>To create a project called <i>my-app</i>, run this command:</p>
          <div class="codeBlockWrapper_2QGZ">
            <pre class="prism-code language-sh codeBlock_19pQ" style="color:#bfc7d5;background-color:#292d3e"><div
                class="token-line" style="color:#bfc7d5"><span
                class="token plain">npx create-mockstar-app my-app</span></div></pre>
          </div>
          <br>
        </div>

        <div class="col col--4">
          <img class="featureImage_3Xqx" alt="Easy to get started in seconds" src="https://camo.githubusercontent.com/29765c4a32f03bd01d44edef1cd674225e3c906b/68747470733a2f2f63646e2e7261776769742e636f6d2f66616365626f6f6b2f6372656174652d72656163742d6170702f323762343261632f73637265656e636173742e737667">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.advantage-one {
  background-color: #f7f7f7;

  .container {
    text-align: left;
    padding-bottom: 5rem !important;
    padding-top: 5rem !important;
  }
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

    &.col--4{
      width: 50%;
    }
  }
}

</style>
