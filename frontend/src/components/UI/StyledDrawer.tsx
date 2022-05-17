import { Drawer, styled } from "@mui/material";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#1E1E1E",
    color: "#EBEBCE",
  },
}));

export default StyledDrawer;
