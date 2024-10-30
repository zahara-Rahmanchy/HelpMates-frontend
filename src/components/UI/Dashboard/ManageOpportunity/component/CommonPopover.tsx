import React, {useState} from "react";
import {
  Box,
  Popover,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
} from "@mui/material";
import {Visibility} from "@mui/icons-material";
import Image from "next/image";

interface CommonPopoverProps {
  label?: string; // Text inside the box
  description?: string; // Content for the popover (text)
  imageSrc?: string; // Optional image source
  flexDirection?: "row" | "column";
}

const CommonPopover: React.FC<CommonPopoverProps> = ({
  label,
  description,
  imageSrc,
  flexDirection,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [view, setView] = useState(false);
  const align = flexDirection === "row" ? "center" : "flex-start";

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
      {/* Box Component */}
      <Box
        gap={2}
        sx={{
          borderRadius: "8px",
          display: "flex",
          flexDirection: flexDirection,
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handlePopoverOpen} // Open popover on box click
      >
        {/* Display Avatar if imageSrc is provided, otherwise show label */}
        {imageSrc ? (
          <>
            {" "}
            <Avatar src={imageSrc} alt={label} />
            <InputAdornment position="start">
              <span style={{fontSize: "12px", color: "blue"}}>
                {" "}
                View Full Image
              </span>
            </InputAdornment>
          </>
        ) : (
          <>
            {" "}
            <Typography
              variant="body1"
              color={"black"}
              fontSize={"14px"}
              sx={{textWrap: "nowrap"}}
            >
              {label}
            </Typography>
            <InputAdornment position="end">
              ... see more
              <IconButton style={{color: "purple"}}>
                <Visibility />
              </IconButton>
            </InputAdornment>
          </>
        )}
      </Box>

      {/* Popover Component */}
      <Popover
        sx={{width: {md: "80%", xs: "90%"}}}
        id={view ? "simple-popover" : undefined}
        open={view}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{p: 2, display: "flex", justifyContent: "center"}}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Popover Content"
              width={300}
              height={300}
              style={{maxWidth: "100%", height: "auto", borderRadius: "8px"}} // Style image
            />
          ) : (
            <Typography>{description}</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default CommonPopover;
