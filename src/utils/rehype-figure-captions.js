import { visitParents } from "unist-util-visit-parents";

export default function rehypeFigureCaptions() {
    return (tree) => {
        visitParents(tree, "element", (node, ancestors) => {
            if (node.tagName !== "img") return;
            const alt = node.properties?.alt;
            if (!alt) return;

            const parent = ancestors[ancestors.length - 1];
            const grandparent = ancestors[ancestors.length - 2];
            if (parent?.tagName === "figure") return;
            const figure = {
                type: "element",
                tagName: "figure",
                properties: { className: ["image-caption"] },
                children: [
                    node,
                    {
                        type: "element",
                        tagName: "figcaption",
                        properties: {},
                        children: [{ type: "text", value: String(alt) }],
                    },
                ],
            };

            if (
                parent?.tagName === "p" &&
                parent.children?.length === 1 &&
                grandparent?.children
            ) {
                const parentIndex = grandparent.children.indexOf(parent);
                if (parentIndex !== -1) {
                    grandparent.children[parentIndex] = figure;
                }
                return;
            }

            if (parent?.children) {
                const nodeIndex = parent.children.indexOf(node);
                if (nodeIndex !== -1) {
                    parent.children[nodeIndex] = figure;
                }
            }
        });
    };
}
