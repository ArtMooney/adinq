<template>
  <div class="flex min-h-screen w-full flex-col items-center gap-8 py-16">
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

    <div
      class="grid w-full grid-cols-2 divide-x divide-white outline outline-white"
    >
      <div class="flex h-full w-full items-center justify-center p-12">
        <h4>Input styles</h4>
      </div>

      <div class="flex w-full flex-col items-center gap-4 bg-neutral-800 p-12">
        <input type="text" placeholder="Ange ditt namn" />
        <input type="email" placeholder="exempel@email.com" />
        <input type="password" placeholder="Minst 8 tecken" />
        <input type="search" placeholder="Sök..." />
        <input type="url" placeholder="https://example.com" />
        <input type="tel" placeholder="070-123 45 67" />
        <input type="number" placeholder="Ange antal" />
        <input type="range" min="0" max="100" value="50" />
        <input type="date" placeholder="ÅÅÅÅ-MM-DD" />
        <input type="time" placeholder="HH:MM" />
        <input type="datetime-local" placeholder="ÅÅÅÅ-MM-DD HH:MM" />
        <input type="month" placeholder="ÅÅÅÅ-MM" />
        <input type="week" placeholder="ÅÅÅÅ-W##" />
        <input type="color" value="#000000" />
        <input type="file" accept="image/*" />

        <input type="button" value="Klicka här" />
        <input type="submit" value="Skicka" />
        <input type="reset" value="Återställ" />
        <input type="image" src="/favicon-32x32.png" alt="Bildknapp" />

        <input type="checkbox" id="check1" />
        <label for="check1">Godkänn villkor</label>

        <label class="flex items-center gap-2">
          <input
            type="radio"
            name="subject"
            value="allmanna-fragor"
            v-model="formData.subject"
            required
          />
          <span>Allmänna frågor</span>
        </label>
        <label class="flex items-center gap-2">
          <input
            type="radio"
            name="subject"
            value="ekonomi"
            v-model="formData.subject"
            required
          />
          <span>Ekonomi</span>
        </label>

        <input type="hidden" value="hemligt-värde" />

        <textarea
          name="message"
          type="message"
          placeholder="Meddelande"
          required
          maxlength="5000"
          class="message"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StyleGuide",

  data() {
    return {
      formData: {
        name: "",
        email: "",
        company: "",
        phone: "",
        city: "",
        message: "",
        subject: "allmanna-fragor",
        clientip: "",
        pageuri: "",
        pagename: "",
        amex: "",
      },
    };
  },
};
</script>
