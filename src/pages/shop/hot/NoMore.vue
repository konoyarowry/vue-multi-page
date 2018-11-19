<template>
  <div class="no-more">
    客官，已经到底了~
  </div>
</template>

<script>
  export default {
    name: "NoMore"
  }
</script>

<style scoped lang="scss">
  @import "~css/commons";

  .no-more {
    height: 90px;
    @extend .flex-aj-center;
    color: $lightFont;
  }
</style>
