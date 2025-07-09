<template>
  <div class="flex h-screen w-full flex-col items-center gap-8 py-16">
    <h1>Style guide</h1>

    <div
      class="grid w-full grid-cols-2 divide-x divide-white outline outline-white"
    >
      <div class="flex h-full w-full items-center justify-center p-12">
        <h4>Heading styles</h4>
      </div>

      <div class="flex w-full flex-col items-center gap-4 p-12">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>
    </div>

    <div
      class="grid w-full grid-cols-2 divide-x divide-white outline outline-white"
    >
      <div class="flex h-full w-full items-center justify-center p-12">
        <h4>Button styles</h4>
      </div>

      <div class="flex w-full flex-col items-center gap-4 p-12">
        <button text="" type="button" class="primary">Test Button</button>
        <button text="" type="button" class="primary disabled">
          Test Button
        </button>

        <button text="" type="button" class="secondary">Test Button</button>
        <button text="" type="button" class="secondary disabled">
          Test Button
        </button>

        <button text="" type="button" class="white">Test Button</button>
        <button text="" type="button" class="white disabled">
          Test Button
        </button>

        <button text="" type="button" class="transparent">Test Button</button>
        <button text="" type="button" class="transparent disabled">
          Test Button
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StyleGuide",
};
</script>
