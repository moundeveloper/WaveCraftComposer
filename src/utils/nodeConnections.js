export const getMappedConnectedNodes = (links) => {
  // Create a Map to store the connected nodes for each node
  const connectedNodesMap = links.reduce((map, link) => {
    const { sourceNode, targetNode } = link;

    if (!map.has(sourceNode)) {
      map.set(sourceNode, new Set());
    }
    map.get(sourceNode).add(targetNode);

    if (!map.has(targetNode)) {
      map.set(targetNode, new Set());
    }
    map.get(targetNode).add(sourceNode);

    return map;
  }, new Map());

  // Step 2: Find nodes connected to more than one node and the nodes they are connected to
  const nodesConnectedToMoreThanOneNode = new Map();
  connectedNodesMap.forEach((connectedNodesSet, node) => {
    if (connectedNodesSet.size > 1) {
      nodesConnectedToMoreThanOneNode.set(node, [...connectedNodesSet]);
    }
  });

  return nodesConnectedToMoreThanOneNode;
};

export const getMappedConnectedNodesSourceTarget = (links) => {
  // Get nodes connected to more than one node and their connected nodes source & target
  const connectedNodesMap = links.reduce((map, link) => {
    const { sourceNode, targetNode } = link;

    // Add sourceNode as a source of targetNode
    if (!map.has(targetNode)) {
      map.set(targetNode, { sources: [], targets: [] });
    }
    map.get(targetNode).sources.push(sourceNode);

    // Add targetNode as a target of sourceNode
    if (!map.has(sourceNode)) {
      map.set(sourceNode, { sources: [], targets: [] });
    }
    map.get(sourceNode).targets.push(targetNode);

    return map;
  }, new Map());

  // Find nodes connected to more than one node and their connected nodes
  const nodesConnectedToMoreThanOneNode = new Map();
  connectedNodesMap.forEach(({ sources, targets }, node) => {
    if (sources.length + targets.length > 1) {
      nodesConnectedToMoreThanOneNode.set(node, { sources, targets });
    }
  });

  return nodesConnectedToMoreThanOneNode;
};

export const getMappedConnectedNodesIsSourceTarget = (links) => {
  // Create a Map to store the connected nodes for each node
  const connectedNodesMap = links.reduce((map, link) => {
    const { sourceNode, targetNode } = link;

    // Add the source node and specify it as a source for the target node
    if (!map.has(sourceNode)) {
      map.set(sourceNode, { source: new Set(), target: new Set() });
    }
    map.get(sourceNode).source.add(targetNode);

    // Add the target node and specify it as a target for the source node
    if (!map.has(targetNode)) {
      map.set(targetNode, { source: new Set(), target: new Set() });
    }
    map.get(targetNode).target.add(sourceNode);

    return map;
  }, new Map());

  // Step 2: Find nodes connected to more than one node and their connected nodes
  const nodesConnectedToMoreThanOneNode = new Map();
  connectedNodesMap.forEach((connectedNodes, node) => {
    const { source, target } = connectedNodes;
    if (source.size + target.size > 1) {
      nodesConnectedToMoreThanOneNode.set(node, {
        sources: [...source],
        targets: [...target],
      });
    }
  });

  return nodesConnectedToMoreThanOneNode;
};
