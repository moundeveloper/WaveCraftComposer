<script setup lang="ts">
import PanningZooming from '@/components/PanningZooming.vue';
import NodeEditor from '@/components/NodeEditor.vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import { NodeType } from '@/types/NodeComponent';
import Terminal from '@/components/Widgets/Terminal/Terminal.vue';
import { NodeFactory } from '@/types/NodeFactory';
import Dialog from '@/components/Dialog.vue';
import { useMouse } from '@/composables/mouse'
import AddNode from '@/components/Widgets/AddNode.vue';

const nodeEditorStore = useNodeEditor()
const { x, y } = useMouse()

const nodeOne = NodeFactory.createNode(NodeType.VARIABLE, { name: 'pippo' })
const nodeCane = NodeFactory.createNode(NodeType.VARIABLE, { name: 'cane' })
const nodeVariable = NodeFactory.createNode(NodeType.PRINT, { name: '' })
const nodeVariable2 = NodeFactory.createNode(NodeType.VARIABLE, { name: 'mario' })


nodeOne.position.setPostion(300, 400)
nodeVariable.position.setPostion(500, 300)
nodeVariable2.position.setPostion(100, 200)
nodeCane.position.setPostion(600,300)
nodeEditorStore.clear()
nodeEditorStore.addNode(nodeOne)
nodeEditorStore.addNode(nodeVariable)
nodeEditorStore.addNode(nodeVariable2)
nodeEditorStore.addNode(nodeCane)
</script>

<template>
  <main>
    <PanningZooming>
      <NodeEditor />
    </PanningZooming>
    <Terminal />
    <Dialog :position="{ x, y }">
      <template v-slot:activator="{ closeDialog }">
        <AddNode :close-dialog="closeDialog" :node-postion="{ x, y }" />
      </template>
    </Dialog>
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


