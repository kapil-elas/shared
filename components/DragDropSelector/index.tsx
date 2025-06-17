import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

interface DragAndDropSelectorProps {
  title: string;
  selectedItems: any[];
  nonSelectedItems: any[];
  onChange: (selected: string[], nonSelected: string[]) => void;
}

const DragAndDropSelector: React.FC<DragAndDropSelectorProps> = ({
  title,
  selectedItems,
  nonSelectedItems,
  onChange,
}) => {
  const [selectedItemsState, setSelectedItemsState] = useState<any>([]);
  const [nonSelectedItemsState, setNonSelectedItemsState] = useState<any>([]);

  useEffect(()=>{
    setSelectedItemsState(selectedItems);
    setNonSelectedItemsState(nonSelectedItems);
  },[]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // console.log(source,destination);
    const assignedId = source.droppableId === 'nonSelected' ? nonSelectedItemsState[source.index].id : '';
    const unAssignedId = source.droppableId === 'selected' ? selectedItemsState[source?.index].id : '';
    // console.log(assignedId,unAssignedId);
    if (!destination) return;
    const newSelected = [...selectedItemsState];
    const newNonSelected = [...nonSelectedItemsState];
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "selected") {
        const [removed] = newSelected.splice(source.index, 1);
        newSelected.splice(destination.index, 0, removed);
      } else {
        const [removed] = newNonSelected.splice(source.index, 1);
        newNonSelected.splice(destination.index, 0, removed);
      }
    } else {
      if (source.droppableId === "selected") {
        const [removed] = newSelected.splice(source.index, 1);
        newNonSelected.splice(destination.index, 0, removed);
      } else {
        const [removed] = newNonSelected.splice(source.index, 1);
        newSelected.splice(destination.index, 0, removed);
      }
    }
    onChange(assignedId, unAssignedId);
    setSelectedItemsState(newSelected);
    setNonSelectedItemsState(newNonSelected);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
        <Droppable droppableId="selected">
          {(provided: DroppableProvided) => (
            <Paper
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ p: 2, width: "100%", minHeight: "100%" }}
            >
              <Typography variant="h6" align="center" fontWeight="bold" mb={1} fontSize={"14px"}>
                Assigned
              </Typography>
              {selectedItemsState.map((item: any, index: number) => (
                <Draggable draggableId={`selected-${item.id}`} index={index} key={item.id}>
                  {(provided: DraggableProvided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        p: 1,
                        mb: 1,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">{item.name}</Typography>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Paper>
          )}
        </Droppable>
        <Droppable droppableId="nonSelected">
          {(provided: DroppableProvided) => (
            <Paper
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ p: 2, width: "100%", minHeight: "100%" }}
            >
              <Typography variant="h6" align="center" fontWeight="bold" mb={1} fontSize={"14px"}>
                Unassigned
              </Typography>
              {nonSelectedItemsState.map((item: any, index: number) => (
                <Draggable draggableId={`nonSelected-${item.id}`} index={index} key={item.id}>
                  {(provided: DraggableProvided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        p: 1,
                        mb: 1,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">{item.name}</Typography>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Paper>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default DragAndDropSelector;
