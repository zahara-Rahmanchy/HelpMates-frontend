"use client";
import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {StaticDateTimePicker} from "@mui/x-date-pickers/StaticDateTimePicker";
import {Box, createTheme, ThemeProvider} from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
const defaultPickerTheme = createTheme({
  palette: {
    primary: {
      main: "#872346",
      light: "#0000",
    },
  },
  typography: {
    h1: {
      fontSize: "10px",
    },
    h4: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "10px",
    },
    h3: {
      fontSize: "16px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Make background transparent
          color: "blue", // Set text color
          borderRadius: "40px",
          width: "50px",

          "&:hover": {
            backgroundColor: "#872346", // Set hover background color
            color: "white",
            padding: "5px",
          },
        },
      },
    },
  },
});
const DateTime = () => {
  const handleAccept = (acceptedDate: Dayjs | null) => {
    if (acceptedDate) {
      console.log("Accepted Date and Time:", acceptedDate.format());
      // Add your additional logic here (e.g., send to server, display somewhere, etc.)
    }
  };
  return (
    <ThemeProvider theme={defaultPickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          // sx={{width: "300px", overflowX: "scroll"}}
          components={[
            "DateTimePicker",
            "MobileDateTimePicker",
            "DesktopDateTimePicker",
            "StaticDateTimePicker",
          ]}
        >
          <DemoItem label="">
            {/* <Box bgcolor={"red"}> */}
            <StaticDateTimePicker
              onAccept={handleAccept}
              slotProps={{
                tabs: {
                  sx: {
                    // backgroundColor: "#F06D64",
                    color: "purple",
                    width: "100%",
                  },
                },
                actionBar: {
                  actions: ["clear", "accept"],
                },
                toolbar: {
                  // Customize value display
                  // toolbarFormat: "ddd D",
                  toolbarFormat: "ddd,MMM D",
                  sx: {
                    // Set styles to make it look like plain text
                    // backgroundColor: "#F06D64",
                    // color: "white",
                    border: "none",
                    padding: "0px",
                  },
                },
              }}
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
                // fontSize: "10px",
                alignItems: "flex-start",
                color: "white",

                // on calender where is displays the date
                // "& .MuiPickersCalendarHeader-root": {
                //   paddingX: "30px",
                //   color: "blue",
                //   background: "crimson", // Example styling
                //   whiteSpace: "nowrap", // Prevent text wrapping
                // },

                "& .MuiDateCalendar-root": {
                  width: "100%",
                  paddingX: "10px",
                  color: "blue",
                },
                // clock container
                "& .MuiTimeClock-root": {
                  minWidth: "100%",
                  width: "100%",
                  margin: "10px auto",
                  paddingTop: "30px",

                  textAlign: "left",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                },

                "& .MuiPickersToolbar-content": {
                  // background: "#F06D64",

                  display: "flex",
                  borderRadius: "2px",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingX: "10px",
                  paddingY: "0px",
                  margin: "0px",
                  gap: "0px",
                  width: "100%",
                  // overflowX: "scroll",
                  color: "white",
                  fontSize: "16px",
                },
                "& .mui-16b5y55-MuiPickersLayout-contentWrapper": {
                  width: "100%",
                },
                // "& .mui-18rj0ic-MuiPickersLayout-root .MuiDateTimePickerToolbar-timeContainer":
                //   {
                //     background: "green",
                //     gap: "0px",
                //     display: "flex",
                //     justifyContent: "flex-end",
                //     alignItems: "flex-end",
                //     padding: "0px",
                //   },
                "& .MuiDateTimePickerToolbar-timeDigitsContainer": {
                  gap: "0px",
                  margin: "0px",
                  padding: "0px",
                  display: "flex",
                  // background: "red",
                  color: "white",
                  width: "50%",
                  fontSize: "20px",
                },
                "& .mui-13vtpvu-MuiTypography-root-MuiPickersToolbarText-root":
                  {
                    display: "none",
                  },
                "& .MuiDateTimePickerToolbar-dateContainer": {
                  // background: "crimson",
                  width: "50%",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  paddingLeft: "30px",
                  color: "#872346",
                  // marginLeft: "5px",

                  flexDirection: "column-reverse",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                },

                // "& .MuiTypography-root-MuiPickersToolbarText-root": {},
                // this is the time picker
                "& .MuiDateTimePickerToolbar-timeContainer": {
                  // background: "crimson",

                  fontSize: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  paddingRight: "10px",
                  margin: "0px",
                },

                "& .MuiPickersLayout-toolbar": {
                  margin: "0px",
                  paddingY: "0px",
                  paddingX: "10px",
                  // background: "yellow",
                  width: "100%",
                },
              }}
              defaultValue={dayjs()}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DateTime;
