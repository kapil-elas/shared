import * as React from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import PropTypes from "prop-types";
import withTheme from "@elas/shared/components/hoc";
import CustomTreeItem from "./CustomTreeItem";

function Hierarchy({
  items,
  childTooltipLabel = "Add Child",
  parentTooltipLabel = "Add Parent",
  defaultExpandedItems,
  defaultSelectedItems,
  hasChildPerms,
  hasParentPerms,
  onItemClick,
  onAddParent,
  onAddChild,
  onDeleteItem,
  onViewItem,
}) {

  const handleItemClick = (event, itemIds) => {
    if (onItemClick) {
      onItemClick(itemIds);
    }
  };

  return (
    <RichTreeView
      items={items}
      defaultExpandedItems={defaultExpandedItems || ["1"]}
      defaultSelectedItems={defaultSelectedItems || ["1"]}
      onSelectedItemsChange={handleItemClick}
      slotProps={{
        item: ({ itemId }) => ({
          item: items.find((i) => i.id === itemId),
          childTooltipLabel: childTooltipLabel,
          parentTooltipLabel: parentTooltipLabel,
          hasParentPerms: hasParentPerms,
          hasChildPerms: hasChildPerms,
          onAddParent: (id) => onAddParent?.(id),
          onAddChild: (id) => onAddChild?.(id),
          onDeleteItem: (id, type) => onDeleteItem?.(id, type),
          onItemClick: (id, type) => onItemClick?.(id, type),
          onViewItem: (id, type) => onViewItem?.(id, type),
        }),
      }}
      slots={{ item: CustomTreeItem }}
      sx={{
        height: "calc(100vh - 150px)",
        flexGrow: 1,
        maxWidth: 500,
        overflowY: "auto",
      }}
    />
  );
}

Hierarchy.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      parentId: PropTypes.string,
    })
  ).isRequired,
  childTooltipLabel: PropTypes.string,
  parentTooltipLabel: PropTypes.string,
  defaultExpandedItems: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedItems: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onAddParent: PropTypes.func,
  onAddChild: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onViewItem: PropTypes.func,
  hasParentPerms: PropTypes.bool,
  hasChildPerms: PropTypes.bool,
};

export default withTheme(Hierarchy);
