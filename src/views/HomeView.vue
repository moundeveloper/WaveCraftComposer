<script setup lang="ts">
import NodeWraper from '@/components/NodeWraper.vue';
import PanningZooming from '@/components/PanningZooming.vue';
import NodeEditor from '@/components/NodeEditor.vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import { VariableNodeComponent, PrintNodeComponent } from '@/types/NodeComponent';
import { genId } from "@/utils/utility"

const nodeEditorStore = useNodeEditor()

const nodeOne = new PrintNodeComponent(genId(), "pippo")
const nodeVariable = new VariableNodeComponent(genId(), "giogio")
const nodeVariable2 = new VariableNodeComponent(genId(), "mario")

nodeOne.position.setPostion(300, 400)
nodeVariable.position.setPostion(500, 300)
nodeVariable2.position.setPostion(100, 200)

nodeEditorStore.addNode(nodeOne)
nodeEditorStore.addNode(nodeVariable)
nodeEditorStore.addNode(nodeVariable2)

</script>

<template>
  <main>
    <PanningZooming>
      <NodeEditor />
    </PanningZooming>
  </main>
</template>

<style scoped>
.node-container {
  position: relative;
  width: 4000px;
  height: 4000px;
  background-color: red;
}
</style>


