import React, { useState, useEffect } from "react";
import ReusableModalHeader from "./ReusableModalHeader";
import GenericGridView from "./GenericGridView";
import { GridColDef, GridRowSelectionModel, GridRowParams } from "@mui/x-data-grid-pro";
import { SoftButton } from "@elas/shared/components";
import colors from "@elas/shared/assets/theme/base/colors";
import ConfirmationModal from "./ConfirmationModal";

const { info } = colors;

export interface GenericSelectionModalProps {
  open: boolean;
  onClose: () => void;
  dialogTitle?: string;
  employeeName?: string;
  selectedLabel?: string;
  columns: GridColDef[];
  rows: any[];
  getChipLabel?: (row: any) => string;
  initialSelectedIds?: (string | number)[];
  onConfirm: (selectedRows: any[]) => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  searchPlaceholder?: string;
  DetailComponent?: React.ComponentType<{
    row: any;
    onClose: () => void;
    editable?: boolean;
  }>
}

const GenericSelectionModal: React.FC<GenericSelectionModalProps> = ({
  open,
  onClose,
  dialogTitle = "Select Role(s)",
  employeeName,
  selectedLabel = "Selected Roles",
  columns,
  rows,
  getChipLabel = (row) => row.value || row.id,
  initialSelectedIds = [],
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  searchPlaceholder = "Search...",
  DetailComponent
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [detailRow, setDetailRow] = useState<any | null>(null);
  const [openConfirmSave, setOpenConfirmSave] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectionModel(initialSelectedIds);
      setSearchTerm("");
      setDetailRow(null);
    }
  }, [open, initialSelectedIds]);

  const filteredRows = rows.filter((row) => {
    const lowerSearch = searchTerm.toLowerCase();
    return Object.values(row).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(lowerSearch)
    );
  });

  const handleRowClick = (params: GridRowParams) => {
    setDetailRow(params.row);
  };

  const handleCloseDetail = () => {
    setDetailRow(null);
  };

  // Called when user clicks "Confirm" in the main modal.
  // Instead of finalizing immediately, we open a second confirmation.
  const handleConfirm = () => {
    setOpenConfirmSave(true);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const handleDeleteChip = (id: number | string) => {
    const updated = selectionModel.filter((sel) => sel !== id);
    setSelectionModel(updated);
  };

  // Final step once user confirms in the second modal.
  const handleConfirmSave = () => {
    setOpenConfirmSave(false);
    const selectedRows = selectionModel.map((id) => rows.find((r) => r.id === id));
    onConfirm(selectedRows);
  };

  const isDetailOpen = Boolean(detailRow);
  const headerTitle = employeeName ? `${dialogTitle} - ${employeeName}` : dialogTitle;

  // Generate comma-separated list of selected roles.
  const selectedRoleLabels = selectionModel
    .map((id) => {
      const row = rows.find((r) => r.id === id);
      return row ? getChipLabel(row) : "";
    })
    .filter(Boolean)
    .join(", ");

  // If no roles are selected, disable the save/confirm buttons.
  const confirmDisabled = selectionModel.length === 0;

  const headerComponent = <ReusableModalHeader title={headerTitle} onClose={onClose} />;
  const contentComponent = (
    <GenericGridView
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder={searchPlaceholder}
      selectedLabel={selectedLabel}
      selectionModel={selectionModel}
      rows={rows}
      columns={columns}
      getChipLabel={getChipLabel}
      onDeleteChip={handleDeleteChip}
      filteredRows={filteredRows}
      handleRowSelectionModelChange={handleSelectionModelChange}
      onRowClick={handleRowClick}
      isDetailOpen={isDetailOpen}
      detailRow={detailRow}
      handleCloseDetail={handleCloseDetail}
      DetailComponent={DetailComponent}
    />
  );

  return (
    <>
      {/* Main modal */}
      <ConfirmationModal
        open={open}
        headerComponent={headerComponent}
        contentComponent={contentComponent}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        dialogWidth="95vw"
        dialogHeight="85vh"
        confirmDisabled={confirmDisabled}
      />

      {/* Second confirmation modal for final "Are you sure?" */}
      <ConfirmationModal
        open={openConfirmSave}
        title="Confirm Save"
        description={`Are you sure you want to save these roles [${selectedRoleLabels}] for ${employeeName}?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleConfirmSave}
        onCancel={() => setOpenConfirmSave(false)}
        confirmDisabled={confirmDisabled}
      />
    </>
  );
};

export default GenericSelectionModal;
