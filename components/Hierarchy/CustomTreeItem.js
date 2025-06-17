import React from "react";
import { TreeItem } from "@mui/x-tree-view";
import PropTypes from "prop-types";
import { CustomLabel } from "./CustomLabel";
import { useTreeItemModel } from "@mui/x-tree-view/hooks";
import { RemoveIcon } from "./RemoveIcon";
import colors from "@elas/shared/assets/theme/base/colors";

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { onAddParent, onAddChild, onDeleteItem, onViewItem, onItemClick, childTooltipLabel, parentTooltipLabel, hasChildPerms, hasParentPerms, ...other } = props;
  const item = useTreeItemModel(props.itemId);

  const handleClick = (event) => {
    event.stopPropagation();
    if (onItemClick) {
      onItemClick(props.itemId,  item?.isParent ? 'DEPARTMENT' : 'POSITION');
    }
  };

  return (
    <TreeItem
      {...other}
      ref={ref}
      onClick={handleClick}
      slots={{
        label: CustomLabel,
        icon: item.isParent ? RemoveIcon : "",
      }}
      slotProps={{
        label: {
          secondaryLabel: item?.secondaryLabel || "",
          isParent: item?.isParent || "",
          isChild: item?.isChild || "",
          hasParentPerms: hasParentPerms || false,
          hasChildPerms: hasChildPerms || false,
          childTooltipLabel: childTooltipLabel || "",
          parentTooltipLabel: parentTooltipLabel || "",
          selected: item?.state?.selected || false,
          onAddParent: () => onAddParent?.(props.itemId),
          onAddChild: () => onAddChild?.(props.itemId),
          onDeleteItem: () => onDeleteItem?.(props.itemId, item?.isParent ? 'DEPARTMENT' : 'POSITION'),
          onViewItem: () => onViewItem?.(props.itemId, item?.isParent ? 'DEPARTMENT' : 'POSITION'),
        },
      }}
      sx={{
        '& .MuiTreeItem-content.MuiRichTreeView-itemContent': {
          borderRadius: '4px',
          '&.Mui-selected': {
            backgroundColor: colors.info.focus,
          },
          '&:hover': {
            backgroundColor: colors.info.extraLight,
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(0, 123, 255, 0.12) !important',
          },
        },
      }}
    />
  );
});

CustomTreeItem.propTypes = {
  id: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  childTooltipLabel: PropTypes.string,
  parentTooltipLabel: PropTypes.string,
  isChild: PropTypes.bool,
  isParent: PropTypes.bool,
  hasParentPerms: PropTypes.bool,
  hasChildPerms: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  item: PropTypes.object,
  onAddParent: PropTypes.func,
  onAddChild: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onViewItem: PropTypes.func,
  onItemClick: PropTypes.func,
};

export default CustomTreeItem;
