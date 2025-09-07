<script setup>
import IconFaFacebookSquare from "~icons/fa/facebook-square";
import IconFaLinkedinSquare from "~icons/fa/linkedin-square";
import IconFaYoutubeSquare from "~icons/fa/youtube-square";
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <a
      href="https://www.facebook.com/ADinQAB/?fref=ts"
      target="_blank"
      rel="noopener"
    >
      <IconFaFacebookSquare
        class="h-6 min-h-6 w-6 min-w-6 opacity-60 transition-opacity duration-300 hover:opacity-75"
      />
    </a>

    <a
      href="https://www.linkedin.com/company/adinq-ab/?originalSubdomain=se"
      target="_blank"
      rel="noopener"
    >
      <IconFaLinkedinSquare
        class="h-6 min-h-6 w-6 min-w-6 opacity-60 transition-opacity duration-300 hover:opacity-75"
      />
    </a>

    <a
      href="https://www.youtube.com/channel/UCnc_HP_7V8zWUTZBpGRdp2w/videos"
      target="_blank"
      rel="noopener"
    >
      <IconFaYoutubeSquare
        class="h-6 min-h-6 w-6 min-w-6 opacity-60 transition-opacity duration-300 hover:opacity-75"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: "SocialMediaIcons",
};
</script>
