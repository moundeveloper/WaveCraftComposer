<script setup lang="ts">
import PanningZooming from '@/components/PanningZooming.vue';
import NodeEditor from '@/components/NodeEditor.vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import { NodeType } from '@/types/NodeComponent';
import Terminal from '@/components/Widgets/Terminal/Terminal.vue';
import { NodeFacotry } from '@/types/NodeFactory';
import Dialog from '@/components/Dialog.vue';
import { useMouse } from '@/composables/mouse'
import AddNode from '@/components/Widgets/AddNode.vue';

const nodeEditorStore = useNodeEditor()

const nodeOne = NodeFacotry.createNode(NodeType.VARIABLE, { name: 'pippo' })
const nodeVariable = NodeFacotry.createNode(NodeType.PRINT, { name: '' })
const nodeVariable2 = NodeFacotry.createNode(NodeType.VARIABLE, { name: 'mario' })


nodeOne.position.setPostion(300, 400)
nodeVariable.position.setPostion(500, 300)
nodeVariable2.position.setPostion(100, 200)

nodeEditorStore.clear()
nodeEditorStore.addNode(nodeOne)
nodeEditorStore.addNode(nodeVariable)
nodeEditorStore.addNode(nodeVariable2)
const { x, y } = useMouse()
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


