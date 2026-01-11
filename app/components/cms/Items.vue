<script setup>
import { VueDraggableNext } from "vue-draggable-next";
</script>

<template>
  <div class="mx-auto mt-8 max-w-3xl justify-center gap-4" id="items-list-top">
    <CmsLoadingSpinner
      v-if="cmsStore.loadingFlag"
      size="large"
      class="mx-auto justify-self-center"
    />

    <div
      v-if="!cmsStore.hasItems && !cmsStore.loadingFlag && showNoItemsMessage"
      class="py-16 text-center"
    >
      No items found
    </div>

    <VueDraggableNext
      v-if="cmsStore.viewMode === 'list'"
      v-model="cmsStore.items"
      :delay="dragDelay"
      :animation="200"
      handle=".dragdrop-handle"
      @end="cmsStore.saveSortOrder"
    >
      <div
        v-for="(item, index) of cmsStore.items"
        @click="handleClick($event, item, index)"
        class="mb-4 grid grid-cols-2 rounded bg-black/25 p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.22)] hover:bg-[#242424]"
        v-show="!cmsStore.loadingFlag"
        :ref="`list-item-${index}`"
        :id="`list-item-${index}`"
        :key="item"
      >
        <CmsItemTitle :item="item" :index="index" />

        <form
          @submit.prevent
          :ref="(el) => (cmsStore.formRefs[index] = el)"
          @click.stop
          v-show="cmsStore.itemOpen && cmsStore.showItem === index"
          class="col-span-2 flex flex-col gap-3 text-sm"
        >
          <div class="my-4 h-px w-full bg-white/25"></div>

          <template v-for="input of cmsStore.schema">
            <template
              v-if="input.type === 'json'"
              v-for="(section, sectionKey) in staticContentTypes[item.title]"
              :key="sectionKey"
            >
              <template v-for="(field, fieldKey) in section" :key="fieldKey">
                <template v-if="typeof field === 'object'">
                  <template
                    v-for="(nestedField, nestedKey) in field"
                    :key="nestedKey"
                  >
                    <CmsInputs
                      :input="
                        contentInput(
                          input,
                          nestedKey,
                          nestedField,
                          `${sectionKey}.${fieldKey}`,
                        )
                      "
                      :item="
                        getContentSection(
                          item,
                          input.name,
                          sectionKey,
                          fieldKey,
                        )
                      "
                      :index="index"
                    />
                  </template>
                </template>

                <template v-else>
                  <CmsInputs
                    :input="contentInput(input, fieldKey, field, sectionKey)"
                    :item="getContentSection(item, input.name, sectionKey)"
                    :index="index"
                  />
                </template>
              </template>
            </template>

            <template v-else>
              <CmsInputs
                v-if="input.name !== 'index' && !cmsStore.selectedTableIsStatic"
                :input="input"
                :item="item"
                :index="index"
              />
            </template>
          </template>

          <button type="submit" class="hidden"></button>
        </form>
      </div>
    </VueDraggableNext>

    <template
      v-if="
        cmsStore.viewMode === 'graph' &&
        cmsStore.hasItems &&
        !cmsStore.loadingFlag
      "
      v-for="graph in graphConfig[cmsStore.tableId]"
      :key="graph?.type"
    >
      <CmsGraphSelectors
        v-if="graph?.type === 'selectors'"
        :graph-settings="graph"
      />

      <CmsGraph v-else :graph-settings="graph" />
    </template>
  </div>
</template>

<script>
import { useLoginStore } from "~/components/cms/stores/loginStore";
import { useCmsStore } from "~/components/cms/stores/cmsStore";
import { graphConfig, staticContentTypes } from "~/../server/db/schema";

export default {
  name: "CmsItems",

  data() {
    const config = useRuntimeConfig();

    return {
      userName: config.public.userName,
      userPass: config.public.userPass,
      dragDelay: 0,
      dragVibration: 100,
      inputErrorIndex: [],
      debounceTimeout: null,
      showNoItemsMessage: false,
    };
  },

  computed: {
    loginStore() {
      return useLoginStore();
    },

    cmsStore() {
      return useCmsStore();
    },
  },

  methods: {
    handleClick(event, item, index) {
      if (this.cmsStore.editingItem) return;

      this.cmsStore.itemCopy = this.deepClone(item);

      if (this.cmsStore.showItem === index) {
        this.cmsStore.showItem = index;
        this.cmsStore.itemOpen = !this.cmsStore.itemOpen;
      } else {
        this.cmsStore.showItem = index;
        this.cmsStore.itemOpen = true;
      }
    },

    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    contentInput(input, fieldKey, field, sectionKey) {
      return {
        ...input,
        name: fieldKey,
        label: sectionKey + "." + fieldKey,
        type: field,
      };
    },

    getContentSection(item, inputName, ...pathKeys) {
      if (!item[inputName]) {
        item[inputName] = {};
      }

      let current = item[inputName];
      let template = staticContentTypes[item.title];

      for (let i = 0; i < pathKeys.length; i++) {
        const key = pathKeys[i];
        template = template?.[key];

        if (!current[key]) {
          const isLastKey = i === pathKeys.length - 1;

          if (isLastKey && template && typeof template === "object") {
            current[key] = Object.fromEntries(
              Object.keys(template).map((k) => [k, ""]),
            );
          } else {
            current[key] = {};
          }
        }

        current = current[key];
      }

      return current;
    },
  },

  watch: {
    "cmsStore.itemOpen"() {
      this.dragDelay = this.cmsStore.itemOpen ? 86400000 : 0;

      if (this.cmsStore.itemOpen) {
        this.inputErrorIndex = Array(this.cmsStore.schema.length - 1).fill(
          null,
        );
      }
    },

    "cmsStore.items": {
      handler(newVal) {
        if (!this.cmsStore.itemOpen) return;

        this.cmsStore.editingItem =
          JSON.stringify(newVal[this.cmsStore.showItem]) !==
          JSON.stringify(this.cmsStore.itemCopy);
      },

      immediate: true,
      deep: true,
    },

    "cmsStore.loadingFlag"(isLoading) {
      if (isLoading) {
        this.showNoItemsMessage = false;
      } else {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.showNoItemsMessage = true;
        }, 500);
      }
    },
  },
};
</script>
