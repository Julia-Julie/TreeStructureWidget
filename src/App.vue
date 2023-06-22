<template>
  <div id="app" class="wdg-tree">
    <div class="wdg-tree__wrapper">
      <div class="wdg-tree__btns">
        <button @click="expand()">Expand</button>
        <button @click="collapse()">Collapse</button>
      </div>

      <div class="wdg-tree__content">
        <div class="wdg-tree--main">
          <tree-structure-widget
            ref="dropDown"
            v-bind="{ ...tree.cat, active }"
            @click="setIds"
          />
        </div>

        <div class="wdg-tree--chosen-list">
          <div
            v-for="(name, index) in getNames"
            :key="index"
            class="wdg-tree--chosen-list-item"
          >
            <button @click="deleteName(index)">&#9986;</button>{{ name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tree from "./tree.json";
import { mapGetters, mapActions } from "vuex";
import TreeStructureWidget from "./components/tree-structure-widget.vue";

export default {
  name: "App",
  components: { TreeStructureWidget },
  data: () => ({ tree: tree.tree }),
  computed: {
    ...mapGetters({ active: "getActive", getNames: "getNames" }),
  },
  created() {
    const { setActive, setNames } = this;
    try {
      const activeIds = sessionStorage.getItem("activeIds");
      const names = sessionStorage.getItem("names");

      setActive(activeIds ? JSON.parse(activeIds) : [this.tree.cat._nodeId]);

      setNames(names ? JSON.parse(names) : []);
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    ...mapActions({
      setActive: "setActive",
      setNamesToStore: "setNames",
    }),
    setIds(items) {
      const { getNames, setNames, setActive } = this;
      const mappedIds = items.map(({ _nodeId }) => _nodeId);

      sessionStorage.setItem("activeIds", JSON.stringify(mappedIds));
      setActive(mappedIds);

      const { _name } = items.at(-1);
      setNames(getNames.concat(_name));
    },
    deleteName(index) {
      const { setNames, getNames } = this;
      setNames(getNames.toSpliced(index, 1));
    },
    setNames(names) {
      const { setNamesToStore } = this;

      sessionStorage.setItem("names", JSON.stringify(names));
      setNamesToStore(names);
    },
    expand() {
      this.$refs?.dropDown?.expand();
    },
    collapse() {
      this.$refs?.dropDown?.collapse();
    },
  },
};
</script>

<style scoped lang="scss">
.wdg-tree {
  // height: 100vh;
  background-color: snow;

  &__wrapper {
    height: 100%;
    width: 90%;
    padding: 20px;
    margin: 0 auto;
  }
  &__content {
    display: flex;
    align-items: flex-start;
  }

  &--main {
    flex-basis: 60%;
  }
  &--list {
    flex-basis: 35%;
  }

  &__btns {
    margin-bottom: 20px;
    button {
      background-color: snow;
      padding: 10px 20px;
      border-radius: 4px;
      border: 1px solid dodgerblue;
      margin-right: 20px;
      font-weight: bold;
      color: dodgerblue;
      cursor: pointer;
      transition: 0.2s box-shadow ease-in-out;

      &:hover {
        box-shadow: 2px 3px 5px silver;
      }
    }
  }

  &--chosen-list {
    button {
      border: none;
      color: darkred;
      background: transparent;
      cursor: pointer;
      transition: 0.2s color ease-in-out;
    }

    &-item {
      margin-bottom: 10px;

      &:hover {
        button {
          color: red;
        }
      }
    }
  }
}
</style>
