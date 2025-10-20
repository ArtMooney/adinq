export default defineEventHandler(async (event) => {
  const FILES = event.context.cloudflare.env.FILES;
  const form = await readMultipartFormData(event);

  if (!form || form.length === 0) {
    throw createError({ statusCode: 400, message: "No file uploaded" });
  }

  const file = form[0];
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    throw createError({
      statusCode: 400,
      message: "Only images allowed",
    });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (file.data.length > maxSize) {
    throw createError({
      statusCode: 400,
      message: "The file is too large (max 5MB)",
    });
  }

  const filename = `${Date.now()}-${file.filename}`;

  await FILES.put(filename, file.data, {
    httpMetadata: {
      contentType: file.type,
    },
  });

  return {
    success: true,
    filename,
    url: `/api/files/${filename}`, // reconstruct for public r2 bucket
  };
});

// Example Vue component usage
//
// <template>
//   <div>
//     <input type="file" @change="uploadFile" accept="image/*">
//     <img v-if="imageUrl" :src="imageUrl" alt="Uploaded">
//   </div>
// </template>
//
// <script setup>
//   const imageUrl = ref('');
//
//   async function uploadFile(event) {
//   const file = event.target.files[0];
//   if (!file) return;
//
//   const formData = new FormData();
//   formData.append('file', file);
//
//   const response = await $fetch('/api/upload', {
//   method: 'POST',
//   body: formData,
// });
//
//   imageUrl.value = response.url;
// }
// </script>