<template>
  <div class="wdg-tree-structure mb-1">
    <div
      @click="_nodeId === active.at(-1) ? undefined : $emit('click', [{ _nodeId, _name }])"
      @dblclick="opened = !opened"
      :class="[
        'mt-1 mb-1',
        { 'high-light': active && _nodeId === active.at(-1) },
      ]"
    >
      {{ _name }}
    </div>

    <template v-if="opened">
      <template v-if="list">
        <tree-structure-widget
          v-for="(item, i) in list"
          :key="i"
          :ref="i"
          @click="(e) => $emit('click', [{ _nodeId, _name }].concat(e))"
          v-bind="{
            ...item,
            active,
            parentSelected: isParentSelected,
          }"
        />
      </template>
      <template v-else>
        <div class="wdg-tree-structure__leaf mt-1 mb-1">
          <div class="mb-1">Direct sale</div>
          <div>Disterburet</div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import TreeStructureWidget from "./tree-structure-widget";

export default {
  name: "TreeStructureWidget",
  components: { TreeStructureWidget },
  data: () => ({ opened: false }),
  computed: {
    isParentSelected({ parentSelected, active = [], _nodeId }) {
      return parentSelected || active.at(-1) === _nodeId;
    },
    list({ cat, leaf }) {
      if (cat?.leaf) return cat.leaf;
      if (cat?.cat) return cat.cat;
      return cat || leaf;
    },
  },
  methods: {
    expand() {
      if (this.isParentSelected) this.opened = true;
      this.$nextTick(() =>
        Object.values(this.$refs).forEach(([{ expand } = {}]) => expand())
      );
    },
    collapse() {
      if (this.isParentSelected) this.opened = false;
      this.$nextTick(() =>
        Object.values(this.$refs).forEach(
          ([{ collapse = () => undefined } = {}]) => collapse()
        )
      );
    },
  },
  mounted() {
    const { active, _nodeId } = this;
    if (active.includes(_nodeId)) this.opened = true;
  },
  props: {
    _name: {
      type: String,
      default: undefined,
    },
    _nodeId: {
      type: [String, Number],
      default: undefined,
    },
    cat: {
      type: [Array, Object],
      default: undefined,
    },
    leaf: {
      type: Array,
      default: undefined,
    },
    active: {
      type: Array,
      default: () => [],
    },
    parentSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.wdg-tree-structure {
  padding: 10px;
  border-left: 2px;
  border-left-style: solid;
  border-color: silver;
  padding: 10px 20px;
  cursor: pointer;

  .high-light {
    display: inline-block;
    padding: 10px;
    font-weight: bold;
    background-color: dodgerblue;
    box-shadow: 2px 3px 5px silver;
    color: azure;
    border-radius: 4px;
    transition: 0.3s box-shadow ease-in-out;
  }
  .mb-1 {
    margin-bottom: 10px;
  }
  .mt-1 {
    margin-top: 10px;
  }

  &__leaf {
    padding: 10px;
    color: blue;
  }
}
</style>
