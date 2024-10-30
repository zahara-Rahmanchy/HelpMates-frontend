import React, {useState} from "react";
import {
  Box,
  Popover,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {Visibility} from "@mui/icons-material";

interface CommonPopoverProps {
  label?: string; // Text inside the box
  description: string; // Content for the popover
  // flexDirection?: "row" | "column";
}
const TextFieldPopover = ({label, description}: CommonPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [view, setView] = useState(false);
  // const align = flexDirection == "row" ? "center" : "flex-start";
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setView(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setView(false);
  };
  return (
    <>
      {" "}
      InputProps=
      {{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              style={{color: "purple"}}
              aria-describedby={view ? "simple-popover" : undefined}
              // variant="contained"
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              {<Visibility />}
            </IconButton>
            <Popover
              id={view ? "simple-popover" : undefined}
              open={view}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Typography sx={{p: 2}}>{description}</Typography>
            </Popover>
          </InputAdornment>
        ),
      }}
    </>
  );
};

export default TextFieldPopover;
